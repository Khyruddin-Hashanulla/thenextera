import { useState, useRef } from 'react';
import api from '../utils/api';

const MediaUpload = ({ 
  type = 'thumbnail', // 'thumbnail' or 'video'
  onSuccess, 
  onError,
  currentUrl = '',
  placeholder = '',
  className = ''
}) => {
  const [uploadMethod, setUploadMethod] = useState('file'); // 'file' or 'url'
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlInput, setUrlInput] = useState('');
  const [preview, setPreview] = useState(currentUrl);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;

    console.log('MediaUpload - File upload started:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadType: type,
      isValidFile: file instanceof File
    });

    setUploading(true);
    setProgress(0);
    setError('');

    try {
      const formData = new FormData();
      formData.append(type, file);
      
      console.log('MediaUpload - FormData created:', {
        fieldName: type,
        formDataEntries: Array.from(formData.entries()).map(([key, value]) => ({
          key,
          valueType: typeof value,
          isFile: value instanceof File,
          fileName: value instanceof File ? value.name : 'N/A'
        }))
      });

      const endpoint = type === 'thumbnail' ? '/api/courses/upload/thumbnail' : '/api/courses/upload/video';
      
      const response = await api.post(endpoint, formData, {
        // Don't set Content-Type header - let browser set it with boundary for multipart
        // withCredentials is already set in api.js
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });

      // Check if response has the expected data structure
      if (response.data && response.data.url) {
        setPreview(response.data.url);
        onSuccess?.(response.data.url, response.data);
      } else {
        throw new Error(response.data?.error || response.data?.message || 'Upload failed - no URL returned');
      }
    } catch (error) {
      console.error('File upload error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Upload failed';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleUrlUpload = async () => {
    if (!urlInput.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const endpoint = type === 'thumbnail' ? '/api/courses/upload/thumbnail-url' : '/api/courses/upload/video-url';
      
      const response = await api.post(endpoint, { url: urlInput.trim() });

      if (response.data.success) {
        setPreview(response.data.url);
        onSuccess?.(response.data.url, response.data);
        setUrlInput('');
      } else {
        throw new Error(response.data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('URL upload error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Upload failed';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const clearPreview = () => {
    setPreview('');
    setUrlInput('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isImage = type === 'thumbnail';
  const acceptedTypes = isImage ? 'image/*' : 'video/*';
  const maxSize = isImage ? '10MB' : '500MB';
  const supportedFormats = isImage ? 'JPG, PNG, GIF, WebP' : 'MP4, MOV, AVI, WebM';

  return (
    <div className={`media-upload ${className}`}>
      {/* Upload Method Toggle */}
      <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => setUploadMethod('file')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            uploadMethod === 'file'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          📁 Upload File
        </button>
        <button
          type="button"
          onClick={() => setUploadMethod('url')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            uploadMethod === 'url'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          🔗 From URL
        </button>
      </div>

      {/* File Upload Method */}
      {uploadMethod === 'file' && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            uploading ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes}
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-600">Uploading... {progress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-4xl mb-2">
                {isImage ? '🖼️' : '🎥'}
              </div>
              <p className="text-lg font-medium text-gray-700">
                Drop your {type} here or{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  browse files
                </button>
              </p>
              <p className="text-sm text-gray-500">
                Max size: {maxSize} • Supported formats: {supportedFormats}
              </p>
            </div>
          )}
        </div>
      )}

      {/* URL Upload Method */}
      {uploadMethod === 'url' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isImage ? 'Image URL or YouTube Video URL' : 'Video URL or YouTube URL'}
            </label>
            <div className="flex space-x-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder={placeholder || `Enter ${type} URL...`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={uploading}
              />
              <button
                type="button"
                onClick={handleUrlUpload}
                disabled={uploading || !urlInput.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <span>Upload</span>
                    <span>↗️</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Supports direct URLs and YouTube links
            </p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">❌ {error}</p>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Preview:</h4>
            <button
              type="button"
              onClick={clearPreview}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              ❌ Remove
            </button>
          </div>
          
          {isImage ? (
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-32 object-cover rounded border"
              onError={() => setError('Failed to load image preview')}
            />
          ) : (
            <div className="bg-black rounded overflow-hidden">
              {preview.includes('youtube.com/embed/') ? (
                <iframe
                  src={preview}
                  className="w-full h-32"
                  frameBorder="0"
                  allowFullScreen
                  title="Video preview"
                ></iframe>
              ) : (
                <video
                  src={preview}
                  className="w-full h-32 object-cover"
                  controls
                  onError={() => setError('Failed to load video preview')}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-2 break-all">{preview}</p>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
