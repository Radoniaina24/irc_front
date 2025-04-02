import React from "react";

const ToHtml = ({ content }: { content: string }) => {
  return (
    <div className="prose lg:prose-xl mx-auto pb-5">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default ToHtml;
