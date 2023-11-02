import { createApiClient } from "@/pages/api/apiClient";
import { Bucket } from "@/type/type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type dataContentProps = {
  token: string;
};

export default function dataContent({ token }: dataContentProps) {
  const [dataSources, setDataSources] = useState<Bucket[]>([]);
  useEffect(() => {
    createApiClient(token, setDataSources);
  }, []);

  return (
    <div>
      <div>
        <p>Current data source</p>
        <pre>{JSON.stringify(dataSources, null, 2)}</pre>
      </div>
    </div>
  );
}
