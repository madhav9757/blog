import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components'; // Import styled-components

// --- Styled Components Definitions ---

const RTERoot = styled.div`
    width: 100%; /* w-full */
`;

const RTELabel = styled.label`
    display: inline-block; /* inline-block */
    margin-bottom: 4px; /* mb-1 = 0.25rem = 4px */
    padding-left: 4px; /* pl-1 = 0.25rem = 4px */
    font-size: 0.875rem; /* Common for labels, adjust as needed */
    color: #4A5568; /* Common gray for labels, adjust as needed */
`;

// --- React Component ---

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <RTERoot>
      {label && <RTELabel>{label}</RTELabel>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey='YOUR_TINYMCE_API_KEY' // **IMPORTANT: Replace with your actual TinyMCE API key**
            initialValue={defaultValue}
            init={{
                height: 500,
                menubar: true,
                plugins: [
                    "image", "advlist", "autolink", "lists", "link", "image",
                    "charmap", "preview", "anchor", "searchreplace", "visualblocks",
                    "code", "fullscreen", "insertdatetime", "media", "table",
                    "code", "help", "wordcount", "anchor", // "anchor" listed twice, kept for consistency
                ],
                toolbar:
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                skin: "oxide", 
                content_css: "default", 
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </RTERoot>
  );
}