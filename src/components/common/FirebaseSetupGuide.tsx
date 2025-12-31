import { BookOpen, AlertCircle, ExternalLink, Copy, CheckCircle, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

interface FirebaseSetupGuideProps {
  onTryDemo?: () => void;
}

export default function FirebaseSetupGuide({ onTryDemo }: FirebaseSetupGuideProps) {
  const [copied, setCopied] = useState(false);

  const envTemplate = `# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(envTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-calm-bg flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl reward-bg mb-4">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl mb-2">Mz. Marianna's Academy</h1>
          <p className="text-muted-foreground">Firebase Setup Required</p>
        </div>

        {/* Alert */}
        <div className="bg-warning-light border-2 border-warning rounded-xl p-6 mb-6 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">Firebase Not Configured</h3>
            <p className="text-sm">
              To use Mz. Marianna's Academy, you need to configure your Firebase project.
              Follow the steps below to get started.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-calm-surface border-2 border-calm-border rounded-2xl p-8">
          <h2 className="text-2xl mb-6">Setup Steps</h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-calm-primary text-white flex items-center justify-center font-semibold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Create Firebase Project</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  If you haven't already, create a new Firebase project:
                </p>
                <a
                  href="https://console.firebase.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-calm-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Open Firebase Console
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-calm-primary text-white flex items-center justify-center font-semibold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Get Firebase Configuration</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  In your Firebase project:
                </p>
                <ol className="text-sm text-muted-foreground space-y-1 ml-4 list-decimal">
                  <li>Go to Project Settings (gear icon)</li>
                  <li>Scroll down to "Your apps"</li>
                  <li>Click the Web icon (&lt;/&gt;) to add a web app</li>
                  <li>Copy the configuration values</li>
                </ol>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-calm-primary text-white flex items-center justify-center font-semibold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Create .env.local File</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  In your project root, create a file named <code className="bg-calm-bg px-2 py-1 rounded">.env.local</code> with this content:
                </p>
                <div className="relative">
                  <pre className="bg-calm-bg border border-calm-border rounded-lg p-4 text-sm overflow-x-auto">
                    <code>{envTemplate}</code>
                  </pre>
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-2 bg-calm-surface border border-calm-border rounded-lg hover:bg-calm-bg transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Replace the placeholder values with your actual Firebase configuration.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-calm-primary text-white flex items-center justify-center font-semibold">
                4
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Enable Authentication</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  In Firebase Console:
                </p>
                <ol className="text-sm text-muted-foreground space-y-1 ml-4 list-decimal">
                  <li>Go to Authentication</li>
                  <li>Click "Get Started"</li>
                  <li>Enable "Email/Password" sign-in method</li>
                  <li>Optionally enable Google sign-in</li>
                </ol>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-calm-primary text-white flex items-center justify-center font-semibold">
                5
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Enable Firestore Database</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  In Firebase Console:
                </p>
                <ol className="text-sm text-muted-foreground space-y-1 ml-4 list-decimal">
                  <li>Go to Firestore Database</li>
                  <li>Click "Create database"</li>
                  <li>Start in test mode (we'll add rules later)</li>
                  <li>Choose your preferred location</li>
                </ol>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-calm-primary text-white flex items-center justify-center font-semibold">
                6
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Restart Development Server</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  After creating .env.local, restart your development server:
                </p>
                <pre className="bg-calm-bg border border-calm-border rounded-lg p-4 text-sm">
                  <code>npm run dev</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-reward-purple-light border border-reward-purple rounded-xl p-6">
            <h3 className="font-semibold mb-2">📚 Need Help?</h3>
            <p className="text-sm mb-3">
              Check out these resources:
            </p>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  href="https://firebase.google.com/docs/web/setup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-calm-primary hover:underline inline-flex items-center gap-1"
                >
                  Firebase Web Setup Guide
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://firebase.google.com/docs/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-calm-primary hover:underline inline-flex items-center gap-1"
                >
                  Firebase Authentication Docs
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <span className="text-muted-foreground">
                  See <code className="bg-calm-bg px-2 py-1 rounded">NEXT_STEPS.md</code> for detailed setup instructions
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Once configured, this screen will automatically disappear and you'll see the login page.</p>
        </div>

        {/* Demo Mode Button */}
        {onTryDemo && (
          <div className="mt-6 text-center">
            <button
              onClick={onTryDemo}
              className="inline-flex items-center gap-2 px-6 py-3 reward-bg text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              <PlayCircle className="w-5 h-5" />
              Try Demo Mode (No Setup Required)
            </button>
            <p className="text-xs text-muted-foreground mt-2">
              Experience the Quest Map with sample data
            </p>
          </div>
        )}
      </div>
    </div>
  );
}