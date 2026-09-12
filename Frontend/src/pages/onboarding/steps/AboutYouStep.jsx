import { useRef } from "react";
import { Camera, UserRound, X } from "lucide-react";

const textareaClass = `
  w-full rounded-xl border border-border bg-surface
  px-4 py-3 text-sm text-heading outline-none
  placeholder:text-muted transition-colors
  focus:border-brand-500/60 focus:ring-2
  focus:ring-brand-500/10
`;

export default function AboutYouStep({ form, user }) {
  const fileInputRef = useRef(null);

  const {
    formData,
    errors,
    previewUrl,
    change,
    changeImage,
    removeImage,
  } = form;

  const imageSource =
    previewUrl || user?.profilePicture;

  const handleRemove = () => {
    removeImage();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-3 block text-sm font-medium text-body">
          Profile picture
        </label>

        <div className="flex flex-wrap items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-soft">
            {imageSource ? (
              <img
                src={imageSource}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound size={32} className="text-muted" />
            )}
          </div>

          <div>
            <label
              htmlFor="profilePicture"
              className="
                inline-flex cursor-pointer items-center gap-2
                rounded-xl border border-border bg-surface
                px-4 py-2.5 text-sm font-medium text-heading
                transition-colors hover:bg-surface-hover
              "
            >
              <Camera size={16} />
              Choose photo
            </label>

            <input
              ref={fileInputRef}
              id="profilePicture"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={changeImage}
              aria-invalid={Boolean(errors.profilePicture)}
              aria-describedby={
                errors.profilePicture
                  ? "profilePicture-error"
                  : undefined
              }
              className="sr-only"
            />

            {formData.profilePicture && (
              <button
                type="button"
                onClick={handleRemove}
                className="ml-3 inline-flex items-center gap-1 text-xs text-muted hover:text-heading"
              >
                <X size={14} />
                Remove
              </button>
            )}

            <p className="mt-2 text-xs text-muted">
              JPG, PNG or WebP. Maximum 5 MB.
            </p>

            {errors.profilePicture && (
              <p
                id="profilePicture-error"
                className="mt-2 text-xs text-danger"
              >
                {errors.profilePicture}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-body"
        >
          Full name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={change}
          placeholder="Your name"
          className={textareaClass}
        />

        {errors.name && (
          <p className="mt-2 text-xs text-danger">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="bio"
          className="mb-2 block text-sm font-medium text-body"
        >
          Bio
        </label>

        <textarea
          id="bio"
          name="bio"
          rows={4}
          maxLength={500}
          value={formData.bio}
          onChange={change}
          placeholder="Tell other developers what you enjoy building..."
          aria-invalid={Boolean(errors.bio)}
          aria-describedby={errors.bio ? "bio-error" : undefined}
          className={`${textareaClass} resize-y`}
        />

        <div className="mt-1.5 flex justify-between gap-3">
          {errors.bio ? (
            <p id="bio-error" className="text-xs text-danger">
              {errors.bio}
            </p>
          ) : (
            <span />
          )}

          <span className="text-xs text-muted">
            {formData.bio.length}/500
          </span>
        </div>
      </div>
    </div>
  );
}