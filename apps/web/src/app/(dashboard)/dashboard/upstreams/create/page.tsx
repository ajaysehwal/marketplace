import { AlertMessage } from "@/components/ui/alert-message";
import CreateUpstreamForm from "@/components/dashboard/upstreams/operations/create";
import React from "react";

export default function CreateUpstream() {
  return (
    <>
      <AlertMessage
        title="Upstreams"
        description="Creating an upstream service allows load balancing and health checking of multiple services."
        type="info"
      />
      <CreateUpstreamForm />
    </>
  );
}
