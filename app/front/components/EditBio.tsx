'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditBioProps {
    currentBio: string;
    userId: number;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function EditBio({ currentBio, userId, onCancel, onSuccess }: EditBioProps) {
    const [bio, setBio] = useState(currentBio);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`/api/users/me/${userId}/edit/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bio }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la modification de la bio");
            }

            setSuccess(true);
            onSuccess();
            router.refresh();
        } catch (err) {
            setError("Une erreur est survenue lors de la mise à jour de la bio.");
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Bio mise à jour avec succès !</p>}

            <form onSubmit={handleUpdate} className="flex flex-col space-y-4">
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="border p-2 rounded h-40"
                    required
                />
                <button type="submit" className="bg-gray-500 text-white py-2 px-4 rounded">
                    Modifier
                </button>
            </form>
        </div>
    );
}
