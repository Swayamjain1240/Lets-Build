import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    getMyProjects,
} from "../services/projectService.js";

const extractProjects = (response) => {
    if (Array.isArray(response?.data)) {
        return response.data;
    }

    if (
        Array.isArray(
            response?.data?.projects
        )
    ) {
        return response.data.projects;
    }

    return [];
};

export default function useProjects() {
    const [projects, setProjects] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const requestRef = useRef(null);

    const refresh = useCallback(async () => {
        // Cancel an older request before starting
        // a new one.
        requestRef.current?.abort();

        const controller =
            new AbortController();

        requestRef.current =
            controller;

        setLoading(true);
        setError("");

        try {
            const response =
                await getMyProjects({
                    signal: controller.signal,
                });

            if (
                controller.signal.aborted
            ) {
                return;
            }

            setProjects(
                extractProjects(response)
            );
        } catch (err) {
            if (
                controller.signal.aborted
            ) {
                return;
            }

            console.error(
                "Failed to fetch projects:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to load projects."
            );

            setProjects([]);
        } finally {
            if (
                !controller.signal.aborted
            ) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        refresh();

        return () => {
            requestRef.current?.abort();
        };
    }, [refresh]);

    return {
        projects,
        loading,
        error,
        refresh,
    };
}