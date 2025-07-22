# NextEra Learning Platform

NextEra is a modern learning platform designed to provide an interactive and engaging educational experience.

## Project Structure

- **Client**: Frontend React application
- **Server**: Backend Node.js/Express API

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/nextera.git
   cd nextera
   ```

2. Install all dependencies:
   ```
   npm run install:all
   ```

## Configuration

1. Create a `.env` file in the Server directory with the following variables:
   ```
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SESSION_SECRET=your_session_secret
   ```

## Development

Run both client and server in development mode:
```
npm run dev
```

Run only the server:
```
npm run dev:server
```

Run only the client:
```
npm run dev:client
```

The client application will be available at: http://localhost:5173

The server API will be available at: http://localhost:8080

## Building for Production

Build the client application:
```
npm run build
```

## Running in Production

Start the production server:
```
npm start
```

Access the application by navigating to the Client/dist/index.html file or by setting up a proper web server to serve the files.

## Features

- User authentication and authorization
- Course management
- Interactive learning materials
- Progress tracking
- Responsive design
- Advanced Media Upload System
  - Dual Upload Methods: Upload files directly or provide URLs (including YouTube links)
  - Cloud Storage: All media stored securely on Cloudinary
  - Smart Thumbnails: Automatic YouTube thumbnail extraction and fallback to default images
  - File Validation: Comprehensive validation for images and videos
  - Progress Tracking: Real-time upload progress with visual feedback
  - Drag & Drop: Intuitive drag-and-drop interface for file uploads

## Technologies Used

### Frontend
- React
- React Router
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

## Media Upload API Endpoints

### Thumbnail Upload
- `POST /courses/upload/thumbnail` - Upload thumbnail file
- `POST /courses/upload/thumbnail-url` - Upload thumbnail from URL

### Video Upload
- `POST /courses/upload/video` - Upload video file
- `POST /courses/upload/video-url` - Upload video from URL

### Supported Formats
- **Images**: JPG, JPEG, PNG, GIF, WebP (max 10MB)
- **Videos**: MP4, MOV, AVI, MKV, WebM (max 500MB)
- **URLs**: Direct image/video URLs, YouTube links

## Usage Examples

### Using the MediaUpload Component

```jsx
import MediaUpload from '../components/MediaUpload';

// For thumbnails
<MediaUpload
  type="thumbnail"
  onUploadSuccess={(url) => setThumbnail(url)}
  onUploadError={(error) => console.error(error)}
  placeholder="Enter image URL or YouTube video URL..."
/>

// For videos
<MediaUpload
  type="video"
  onUploadSuccess={(url) => setVideoUrl(url)}
  onUploadError={(error) => console.error(error)}
  placeholder="Enter video URL or YouTube URL..."
/>
```

## Architecture

### Backend (Node.js/Express)
- **Cloudinary Integration**: Handles file uploads and URL processing
- **MongoDB Storage**: Stores course data with media URLs
- **Validation**: Comprehensive file and URL validation
- **Error Handling**: Robust error handling with detailed messages

### Frontend (React)
- **MediaUpload Component**: Reusable component for all media uploads
- **Drag & Drop**: Intuitive file upload interface
- **Progress Tracking**: Real-time upload progress
- **Preview System**: Live preview of uploaded media

## Troubleshooting

### Common Issues

1. **Upload fails with "Invalid URL"**
   - Ensure the URL is publicly accessible
   - Check if the URL points directly to an image/video file

2. **YouTube videos not working**
   - Verify the YouTube URL format is correct
   - Ensure the video is publicly available

3. **Cloudinary errors**
   - Check your Cloudinary credentials in `.env`
   - Verify your Cloudinary account has sufficient storage

4. **File size errors**
   - Images: Max 10MB
   - Videos: Max 500MB
   - Consider compressing large files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.