import { useEffect, useState } from "react";
import { Notifications } from "../types/Types";

export default function Notification({ id_user }: { id_user: string }) {
    const [notifications, setNotifications] = useState<Notifications[]>([]);

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/notifications/${id_user}`)
                const data = await response.json();
                if (!response.ok) { throw new Error }

            } catch (error) {
                console.error('Erreur lors de la récupération des notifications :', error);
            }
        };
    }, [id_user]);


    return (
        <div className="p-4 bg-white shadow-md rounded">
            <h3 className="text-lg font-semibold">Notifications</h3>
            {notifications.length > 0 ? (
                notifications.map((notif) => (
                    <div key={notif.id_notification}>
                        <p>{notif.message}</p>
                    </div>
                ))
            ) : (
                <p>Aucune notification pour le moment</p>
            )}
        </div>
    );
}
