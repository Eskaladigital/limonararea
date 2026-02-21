"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function ContactForm() {
  const { t } = useLanguage();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSent(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }
    } catch {
      // silently fail
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-sand-lt rounded-2xl p-10 text-center">
        <CheckCircle className="h-12 w-12 text-olive mx-auto mb-4" />
        <h3 className="text-xl font-heading font-extrabold text-earth mb-2">
          {t("¡Mensaje enviado!")}
        </h3>
        <p className="text-gray-500 text-sm">
          {t("Te responderemos lo antes posible. Gracias por contactar con nosotros.")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            {t("Nombre")} *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-earth/30 focus:border-earth transition-all"
            placeholder={t("Tu nombre")}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            {t("Email")} *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-earth/30 focus:border-earth transition-all"
            placeholder={t("tu@email.com")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            {t("Teléfono")}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-earth/30 focus:border-earth transition-all"
            placeholder={t("+34 600 000 000")}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            {t("Asunto")}
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-earth/30 focus:border-earth transition-all"
          >
            <option value="">{t("Selecciona un asunto")}</option>
            <option value="reserva">{t("Información sobre reservas")}</option>
            <option value="parcelas">{t("Información sobre parcelas")}</option>
            <option value="servicios">{t("Servicios e instalaciones")}</option>
            <option value="otro">{t("Otro")}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          {t("Mensaje")} *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-earth/30 focus:border-earth transition-all resize-none"
          placeholder={t("Escribe tu mensaje aquí...")}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full md:w-auto bg-clay text-white font-extrabold px-10 py-4 rounded-full text-base hover:bg-clay-dk hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        {sending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {t("Enviando...")}
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            {t("Enviar mensaje")}
          </>
        )}
      </button>
    </form>
  );
}
