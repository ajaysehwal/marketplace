import React from "react";
import Services from "@/components/dashboard/services/index";
import { AlertMessage } from "@/components/ui/alert-message";
export default function page() {
  return (
    <div>
      <AlertMessage
        title="Services"
        description="A service can correspond to a set of upstream nodes and can be bound by multiple routes."
        type="info"
      />
      <Services />
    </div>
  );
}
