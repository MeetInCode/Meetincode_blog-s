/* eslint-disable react/prop-types */
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

/* example 
<RTE 
  name="description" 
  control={control} 
  label="Product Description" 
  defaultValue="This is a sample product description."
/> */
export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        // The 'name' prop specifies the field name in the form data
        // If a 'name' prop is passed to the RTE component, use that; otherwise, default to "content"
        name={name || "content"}
        // The 'control' prop connects this field to react-hook-form's form control
        // It's passed down from the parent component and manages the form's state
        control={control}
        // The 'render' prop is a function that returns the actual form field component
        // It receives an object with form field properties and methods
        render={({ field: { onChange } }) => (
          // Here, we're destructuring to get the 'onChange' method from the 'field' object
          // This 'onChange' will update the form state when the editor content changes

          <Editor
            // The Editor component (TinyMCE in this case) is rendered here
            apiKey="oell3x3ejepgkbsv1d4xycxls46twil27maskpnkd3ruih5f"
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
