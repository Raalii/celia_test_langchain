"use client";

// app/components/PreTestForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import "tailwindcss/tailwind.css";
import * as z from "zod";

const schema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  name: z.string().min(1, { message: "Le nom est requis" }),
  age: z.number().min(1, { message: "L'âge doit être supérieur à 0" }),
  gender: z.enum(["Male", "Female", "Other"], {
    message: "Le genre est requis",
  }),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    message: "Le niveau est requis",
  }),
});

type FormData = z.infer<typeof schema>;

const PreTestForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/pre-test", data);
      toast.success("Données soumises avec succès!");
      router.push("/test");
    } catch (error) {
      toast.error(
        "Erreur lors de la soumission des données. Veuillez réessayer."
      );
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Formulaire de Pré-Test
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-8 shadow-lg rounded-lg"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Âge</label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <select
            {...register("gender")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Male">Masculin</option>
            <option value="Female">Féminin</option>
            <option value="Other">Autre</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Niveau
          </label>
          <select
            {...register("level")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Beginner">Débutant</option>
            <option value="Intermediate">Intermédiaire</option>
            <option value="Advanced">Avancé</option>
          </select>
          {errors.level && (
            <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Chargement..." : "Soumettre"}
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default PreTestForm;
