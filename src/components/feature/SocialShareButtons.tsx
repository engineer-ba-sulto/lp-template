"use client";

import { TwitterShareButton, XIcon } from "react-share";
import { Button } from "../ui/button";

export default function SocialShareButtons() {
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <TwitterShareButton
      url={shareUrl}
      title={"このサービスをXで共有する"}
      className="flex items-center gap-2 w-full"
    >
      <Button
        className="flex w-full justify-center items-center"
        variant="outline"
        asChild
      >
        <div>
          <XIcon />
          <span className="text-lg">で共有</span>
        </div>
      </Button>
    </TwitterShareButton>
  );
}
