import {setGlobalOptions} from "firebase-functions";
import {HttpsError, onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
import {FieldValue, getFirestore} from "firebase-admin/firestore";

setGlobalOptions({maxInstances: 10});

initializeApp();

const auth = getAuth();
const firestore = getFirestore();

const ALLOWED_ROLES = new Set(["student", "parent", "tutor", "admin"]);

export const setUserRole = onCall({cors: true}, async (request) => {
	if (!request.auth) {
		throw new HttpsError("unauthenticated", "Only authenticated callers can assign roles.");
	}

	const callerRole = request.auth.token?.role;
	if (callerRole !== "admin") {
		throw new HttpsError("permission-denied", "Only admins may assign roles.");
	}

	const {targetUid, role} = request.data || {};
	if (typeof targetUid !== "string" || targetUid.trim().length === 0) {
		throw new HttpsError("invalid-argument", "targetUid is required.");
	}

	if (typeof role !== "string" || role.trim().length === 0) {
		throw new HttpsError("invalid-argument", "role is required.");
	}

	const normalizedRole = role.trim().toLowerCase();

	if (!ALLOWED_ROLES.has(normalizedRole)) {
		throw new HttpsError("invalid-argument", `Unsupported role: ${role}`);
	}

	let userRecord;
	try {
		userRecord = await auth.getUser(targetUid);
	} catch (error) {
		logger.error("Failed to load user for role assignment", {targetUid, error});
		throw new HttpsError("not-found", `User ${targetUid} does not exist.`);
	}

	const existingClaims = userRecord.customClaims || {};

	await auth.setCustomUserClaims(targetUid, {
		...existingClaims,
		role: normalizedRole,
	});

	const userDocRef = firestore.collection("users").doc(targetUid);

	await userDocRef.set({
		role: normalizedRole,
		displayName: userRecord.displayName ?? null,
		updatedAt: FieldValue.serverTimestamp(),
		updatedBy: request.auth.uid,
	}, {merge: true});

	logger.info("Assigned role", {
		targetUid,
		role: normalizedRole,
		assignedBy: request.auth.uid,
	});

	return {
		status: "ok",
		role: normalizedRole,
	};
});
