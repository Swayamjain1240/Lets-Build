import {
  CheckCircle2,
  Send,
} from "lucide-react";

export default function RecruitmentInterestPanel({
  recruitment,
  isOwner,
  requestSent,
  onRequest,
}) {
  return (
    <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
      <h2 className="font-semibold text-heading">
        Interested?
      </h2>

      {isOwner ? (
        <>
          <p className="mt-3 text-sm leading-6 text-muted">
            This recruitment belongs
            to one of your projects.
          </p>

          <p className="mt-4 text-xs text-muted">
            Manage this opportunity
            using the controls above.
          </p>
        </>
      ) : !recruitment.isOpen ? (
        <p className="mt-3 text-sm leading-6 text-muted">
          This recruitment is currently
          closed and is not accepting
          new requests.
        </p>
      ) : requestSent ? (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <CheckCircle2
            size={19}
            className="text-emerald-400"
          />

          <div>
            <p className="text-sm font-medium text-heading">
              Request sent
            </p>

            <p className="mt-1 text-xs text-muted">
              The project owner can now
              review your request.
            </p>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-3 text-sm leading-6 text-muted">
            Think your skills match this
            opportunity? Send a request
            to the project owner.
          </p>

          <button
            type="button"
            onClick={onRequest}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            <Send size={16} />
            Request to Join
          </button>
        </>
      )}
    </aside>
  );
}