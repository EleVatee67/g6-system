"use client";

import { useSession } from "next-auth/react";
import { Shield, Users, Settings, AlertTriangle, UserPlus, Trash2, Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const users = [
  { id: "1", name: "Officer John", email: "john@example.com", role: "USER" },
  { id: "2", name: "Admin Mike", email: "mike@example.com", role: "ADMIN" },
  { id: "3", name: "Mod Sarah", email: "sarah@example.com", role: "MODERATOR" },
];

export default function AdminPage() {
  const { data: session } = useSession();
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newRole, setNewRole] = useState("");

  const isAdmin = (session?.user as any)?.role === "ADMIN" || true; // Force true for demo

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <AlertTriangle size={64} className="text-red-500" />
        <h1 className="text-2xl font-bold text-white">Brak dostępu</h1>
        <p className="text-gray-400">Tylko administratorzy mają dostęp do tego panelu.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          <Shield className="text-red-500" size={32} />
          Panel Administracyjny
        </h1>
        <p className="text-gray-400 mt-1">Zarządzaj uprawnieniami użytkowników i ustawieniami systemu.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="text-primary" size={20} />
              Zarządzanie Użytkownikami
            </h2>
            <button className="btn-primary flex items-center gap-2 text-sm py-1.5 px-3">
              <UserPlus size={16} />
              Dodaj ręcznie
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-gray-400 font-medium border-b border-white/10 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Użytkownik</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Rola</th>
                  <th className="px-6 py-4 text-right">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                        <img src={`https://ui-avatars.com/api/?name=${user.name}`} alt={user.name} />
                      </div>
                      <span className="font-bold text-white">{user.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{user.email}</td>
                    <td className="px-6 py-4">
                      {editingUser === user.id ? (
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="bg-[#2C2F33] border border-primary/50 rounded px-2 py-1 text-white text-xs"
                        >
                          <option value="USER">USER</option>
                          <option value="MODERATOR">MODERATOR</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                          user.role === 'ADMIN' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                          user.role === 'MODERATOR' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                          'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        }`}>
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {editingUser === user.id ? (
                        <>
                          <button onClick={() => setEditingUser(null)} className="p-1.5 text-green-500 hover:bg-green-500/10 rounded">
                            <Save size={16} />
                          </button>
                          <button onClick={() => setEditingUser(null)} className="p-1.5 text-gray-400 hover:bg-white/10 rounded">
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => { setEditingUser(user.id); setNewRole(user.role); }}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="text-primary" size={20} />
            Ustawienia Systemowe
          </h2>
          <div className="card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-tight">Tryb Serwisowy</p>
                <p className="text-xs text-gray-500">Wyłącza możliwość składania raportów.</p>
              </div>
              <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-3 h-3 bg-gray-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-tight">Publiczne Raporty</p>
                <p className="text-xs text-gray-500">Czy raporty są widoczne dla wszystkich.</p>
              </div>
              <div className="w-10 h-5 bg-primary/20 rounded-full relative cursor-pointer border border-primary/30">
                <div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <button className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-lg transition-colors border border-red-500/20 text-xs">
                WYCZYŚĆ LOGI SYSTEMOWE
              </button>
            </div>
          </div>

          <div className="card bg-primary/10 border-primary/20">
            <h3 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <Info size={16} className="text-primary" />
              Statystyki Panelu
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Ostatnia kopia zapasowa:</span>
                <span className="text-white font-medium">24.03 04:00</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Zajętość bazy danych:</span>
                <span className="text-white font-medium">12.4 MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}