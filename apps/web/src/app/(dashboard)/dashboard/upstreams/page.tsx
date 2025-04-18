import React from "react";
import { AlertMessage } from "@/components/ui/alert-message";
import { UpstreamsTable } from "@/components/dashboard/upstreams";

export default function Upstreams() {
  return (
    <>
      <AlertMessage
        title="Upstreams"
        description="The upstream list contains the created upstream services (i.e., backend services) and allows load balancing and health checking of multiple services."
        type="info"
      />
      <UpstreamsTable />
    </>
  );
}
