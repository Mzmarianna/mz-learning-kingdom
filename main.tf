
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.6.0"
    }
  }
}

provider "google" {
  project = "mz-marianna-kingdom-learning"
}

resource "google_gke_hub_membership" "membership" {
  project       = "mz-marianna-kingdom-learning"
  membership_id = "tf-test-membership"
  endpoint {
    gke_cluster {
      resource_link = "//container.googleapis.com/${google_container_cluster.primary.id}"
    }
  }
  description = "My GKE Hub Membership"
}

resource "google_container_cluster" "primary" {
  name     = "mz-marianna-kingdom-learning"
  location = "us-central1"

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1
}
