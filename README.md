# File Upload Application with Next.js, Material-UI, and Firebase

This project is a full-stack application demonstrating how to implement file uploads and storage using Next.js, Material-UI, and Firebase Storage.

## Features

- File upload to Firebase Storage using Next.js API routes.
- Display file upload progress with Material-UI LinearProgress bar.
- List and categorize uploaded files by year using dynamic tabs.
- Environment variable integration for secure credential management.

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (12.x or higher)
- npm or Yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/bmedrano011/File-Uploads-Storage-NextJS-Firebase.git
   cd your-repository-folder
   ```

Install the dependencies:

sh 2. Install the dependencies:
npm install

# or

yarn install

3. Set up your Firebase project and obtain your Firebase configuration. Create a .env.local file at the root of the project and fill in your Firebase credentials:

# .env.local

NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

4. Run the development server:
   npm run dev

# or

yarn dev

### Usage

After setting up your environment, you can start uploading files through the UI. The uploaded files will be displayed below the upload button, and you can manage or view these files in your Firebase Storage console.

### Contact

Your Name - bam011.dev@example.com

Project Link: https://github.com/bmedrano011/File-Uploads-Storage-NextJS-Firebase
