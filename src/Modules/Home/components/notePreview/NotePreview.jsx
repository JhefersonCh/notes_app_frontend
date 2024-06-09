import DOMPurify from "dompurify";
import "./NotePreview.css";

/* eslint-disable react/prop-types */
export const NotePreview = ({ note }) => {
  const sanitizedContent = DOMPurify.sanitize(note?.content ? note?.content : '---', {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
  });

  return (
    <div className="w-100">
      <div className="d-flex justify-content-center mb-3">
        <h1 className="d-flex">Preview of <span className="font-monospace text-danger fw-bold p-0 d-flex" style={{ marginLeft: "15px" }}>{note?.title || ''}</span></h1>
      </div>
      <article className="content-preview-container">
        <div className="mb-3">
          <strong>Content:</strong>
        </div>
        <div className="d-flex flex-column gap-2 justify-content-center" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
      </article>
    </div>
  );
};
