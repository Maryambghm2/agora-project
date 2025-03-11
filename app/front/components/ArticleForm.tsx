'use client'

import { useState } from "react"

export default function ArticleForm() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("");
    const [id_user, setId_user] = useState("");
    const [error, setError] = useState<string |null>(null);


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !id_user) {
        setError("Tous les champs sont requis.");
        return;
      }
}

try { 
    const response = await fetch()
}

}