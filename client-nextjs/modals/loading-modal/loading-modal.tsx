import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export default function LoadingModal() {
  const isLoading = useTypedSelector((state) => state.user.isLoading);

  return <>{isLoading && <div>loading..</div>}</>;
}
