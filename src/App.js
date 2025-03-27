import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';

function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('biolink-files')
        .list('uploads/', { limit: 100, offset: 0 });

      if (error) {
        console.error('Error fetching files:', error);
      } else {
        setFiles(data);
      }
    } catch (err) {
      console.error('Unexpected fetch error:', err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleCreateFolder = async () => {
    if (!folderName) {
      alert("Please enter a folder name.");
      return;
    }

    try {
      const { error } = await supabase.storage
        .from('biolink-files')
        .upload(`uploads/${folderName}/.keep`, new Blob([]));

      if (error) {
        console.error('Folder Creation Error:', error);
        alert(`Failed to create folder: ${error.message}`);
      } else {
        fetchFiles();
      }
    } catch (err) {
      console.error('Unexpected Folder Creation Error:', err);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const filePath = selectedFolder 
      ? `uploads/${selectedFolder}/${file.name}` 
      : `uploads/${file.name}`;

    try {
      const { data, error } = await supabase.storage
        .from('biolink-files')
        .upload(filePath, file);

      if (error) {
        console.error('Upload Error:', error);
        alert(`Upload failed: ${error.message}`);
      } else {
        fetchFiles();
      }
    } catch (err) {
      console.error('Unexpected Upload Error:', err);
    }
  };

  const handleDownload = async (fileName) => {
    try {
      const { data, error } = await supabase.storage
        .from('biolink-files')
        .download(`uploads/${fileName}`);

      if (error) {
        console.error('Download Error:', error);
      } else {
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
      }
    } catch (err) {
      console.error('Unexpected Download Error:', err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📦 BioLink Cloud Storage</h1>

      <h2>📁 Folder Management</h2>
      <input 
        type="text" 
        placeholder="Enter folder name" 
        value={folderName} 
        onChange={(e) => setFolderName(e.target.value)} 
      />
      <button onClick={handleCreateFolder}>Create Folder</button>

      <h2>📤 Upload File</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input 
        type="text" 
        placeholder="Optional folder (e.g., docs)" 
        value={selectedFolder} 
        onChange={(e) => setSelectedFolder(e.target.value)} 
      />
      <button onClick={handleUpload}>Upload File</button>

      <h2>📂 Uploaded Files</h2>
      <ul>
        {files.length === 0 && <p>No files uploaded yet.</p>}
        {files.map((fileItem) => (
          <li key={fileItem.name}>
            {fileItem.name}
            <button onClick={() => handleDownload(fileItem.name)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
