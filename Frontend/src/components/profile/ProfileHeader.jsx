import { ExternalLink, Pencil } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avatar from "../user/Avatar.jsx";

export default function ProfileHeader({
    profile,
    isOwnProfile = false,
}) {
    if (!profile) return null;

    const {
        name,
        profilePicture,
        experience,
        githubUrl,
        linkedinUrl,
        college,
    } = profile;

    return (
        <section className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <Avatar
                    src={profilePicture}
                    name={name}
                    size="xl"
                />

                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-heading">
                                {name || "Developer"}
                            </h1>

                            <p className="mt-2 text-sm font-medium text-brand-400">
                                {experience || "Beginner"} Developer
                            </p>

                            {college?.name && (
                                <p className="mt-2 text-sm text-muted">
                                    {college.name}
                                </p>
                            )}
                        </div>

                        {isOwnProfile && (
                            <Link
                                to="/profile/edit"
                                className="
                                    inline-flex items-center justify-center gap-2
                                    rounded-xl border border-border
                                    px-4 py-2.5 text-sm font-medium text-heading
                                    transition-colors
                                    hover:bg-background
                                "
                            >
                                <Pencil size={16} />
                                Edit profile
                            </Link>
                        )}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        {githubUrl && (
                            <ExternalProfileLink
                                href={githubUrl}
                                icon={FaGithub}
                                label="GitHub"
                            />
                        )}

                        {linkedinUrl && (
                            <ExternalProfileLink
                                href={linkedinUrl}
                                icon={FaLinkedin}
                                label="LinkedIn"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ExternalProfileLink({
    href,
    icon: Icon,
    label,
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="
                inline-flex items-center gap-2
                rounded-lg border border-border
                px-3 py-2 text-sm text-muted
                transition-colors
                hover:border-brand-500/30
                hover:text-heading
            "
        >
            <Icon size={16} />

            {label}

            <ExternalLink size={13} />
        </a>
    );
}