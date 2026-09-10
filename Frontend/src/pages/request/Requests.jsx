import {
  RefreshCw,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import RequestTabs from "../../components/request/RequestTabs.jsx";
import RequestList from "../../components/request/RequestList.jsx";

import useRequests from "../../hooks/useRequests.js";

import {
  acceptRequest,
  rejectRequest,
} from "../../services/requestService.js";

const sortRequests = (
  requests
) => {
  return [...requests].sort(
    (a, b) =>
      (new Date(
        b.createdAt
      ).getTime() || 0) -
      (new Date(
        a.createdAt
      ).getTime() || 0)
  );
};

export default function Requests() {
  const [activeTab, setActiveTab] =
    useState("received");

  const received =
    useRequests("received");

  const sent =
    useRequests("sent");

  const [
    processingRequestId,
    setProcessingRequestId,
  ] = useState("");

  const [
    processingAction,
    setProcessingAction,
  ] = useState("");

  const [
    actionError,
    setActionError,
  ] = useState("");

  const receivedRequests =
    useMemo(
      () =>
        sortRequests(
          received.requests
        ),
      [received.requests]
    );

  const sentRequests =
    useMemo(
      () =>
        sortRequests(
          sent.requests
        ),
      [sent.requests]
    );

  const current =
    activeTab === "received"
      ? received
      : sent;

  const currentRequests =
    activeTab === "received"
      ? receivedRequests
      : sentRequests;

  const handleRequestAction =
    async (
      request,
      action
    ) => {
      if (
        processingRequestId ||
        request.status !== "PENDING"
      ) {
        return;
      }

      const label =
        action === "accept"
          ? "accept"
          : "reject";

      const confirmed =
        window.confirm(
          `${label === "accept" ? "Accept" : "Reject"} this request?`
        );

      if (!confirmed) return;

      setProcessingRequestId(
        request._id
      );

      setProcessingAction(
        action
      );

      setActionError("");

      try {
        if (
          action === "accept"
        ) {
          await acceptRequest(
            request._id
          );
        } else {
          await rejectRequest(
            request._id
          );
        }

        await Promise.all([
          received.refresh(),
          sent.refresh(),
        ]);
      } catch (error) {
        setActionError(
          error.response?.data
            ?.message ||
            `Unable to ${label} request.`
        );
      } finally {
        setProcessingRequestId("");
        setProcessingAction("");
      }
    };

  const handleRefresh =
    async () => {
      setActionError("");

      await Promise.all([
        received.refresh(),
        sent.refresh(),
      ]);
    };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-400">
            Collaboration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-heading">
            Requests
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Manage project join
            requests and invitations.
          </p>
        </div>

        <button
          type="button"
          onClick={
            handleRefresh
          }
          disabled={
            received.loading ||
            sent.loading
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-heading hover:bg-surface disabled:opacity-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </header>

      <RequestTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        receivedCount={
          receivedRequests.length
        }
        sentCount={
          sentRequests.length
        }
      />

      {actionError && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400"
        >
          {actionError}
        </div>
      )}

      <RequestList
        requests={
          currentRequests
        }
        loading={
          current.loading
        }
        error={current.error}
        mode={activeTab}
        onRetry={
          current.refresh
        }
        processingRequestId={
          processingRequestId
        }
        processingAction={
          processingAction
        }
        onAccept={(request) =>
          handleRequestAction(
            request,
            "accept"
          )
        }
        onReject={(request) =>
          handleRequestAction(
            request,
            "reject"
          )
        }
      />
    </div>
  );
}