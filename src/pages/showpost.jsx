import React from "react";

function Showpost() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">
        “Understanding ECMAScript Versions: A Developer’s Guide To JavaScript”
      </h1>
      <div className="flex items-center mb-4">
        <img
          src="https://placehold.co/40x40"
          alt="Author's Avatar"
          className="rounded-full mr-2"
        />
        <span className="text-muted-foreground">
          By mehtameet / September 17, 2024
        </span>
      </div>
      <div className="mb-6">
        <img
          src="https://placehold.co/600x400"
          alt="JavaScript and ECMAScript"
          className="w-full rounded-lg"
        />
      </div>
      <blockquote className="border-l-4 border-primary pl-4 italic mb-6">
        And you were created from me.
      </blockquote>
      <h2 className="text-xl font-semibold mb-2">
        Introduction: Why Understanding ECMAScript Matters
      </h2>
      <p className="mb-4">
        New developers—don’t worry if the terms sound technical; we’ll break
        them down!
      </p>
    </div>
  );
}

export default Showpost;
