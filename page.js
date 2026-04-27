'use client';

import React, { useState, useEffect } from 'react';

const platsAFavoriser = [
  { nom: "Œufs brouillés + avocat + tomates", cat: "petit-déj", temps: "10 min", ig: "Très bas", conseil: "Protéines + lipides + légumes = aucun pic" },
  { nom: "Yaourt grec + noix + myrtilles", cat: "petit-déj", temps: "5 min", ig: "Bas", conseil: "Fruits rouges IG très bas + protéines du yaourt" },
  { nom: "Omelette légumes + fromage", cat: "petit-déj", temps: "15 min", ig: "Très bas", conseil: "Quasi zéro glucides, très rassasiant" },
  { nom: "Porridge + œuf + fruits rouges", cat: "petit-déj", temps: "10 min", ig: "Modéré", conseil: "L'œuf ralentit l'absorption de l'avoine" },
  { nom: "Saumon + légumes + patate douce", cat: "déjeuner", temps: "30 min", ig: "Modéré", conseil: "Oméga-3 + fibres, mange les légumes en premier" },
  { nom: "Salade poulet + avocat + quinoa", cat: "déjeuner", temps: "15 min", ig: "Bas", conseil: "Ordre naturel respecté, quinoa IG bas" },
  { nom: "Sardines + salade méditerranéenne", cat: "déjeuner", temps: "10 min", ig: "Très bas", conseil: "Oméga-3, quasi zéro glucides" },
  { nom: "Steak + haricots verts + purée chou-fleur", cat: "déjeuner", temps: "20 min", ig: "Très bas", conseil: "Chou-fleur remplace la purée de PDT" },
  { nom: "Bowl lentilles + légumes + œuf", cat: "déjeuner", temps: "20 min", ig: "Bas", conseil: "Lentilles = IG 30, très riches en fibres" },
  { nom: "Poisson blanc + légumes vapeur", cat: "dîner", temps: "20 min", ig: "Très bas", conseil: "Léger, parfait pour glycémie nocturne stable" },
  { nom: "Poulet curry coco + légumes (sans riz)", cat: "dîner", temps: "25 min", ig: "Très bas", conseil: "Lait de coco = lipides qui ralentissent" },
  { nom: "Soupe légumes + omelette", cat: "dîner", temps: "20 min", ig: "Très bas", conseil: "Digeste, fibres + protéines" },
  { nom: "Salade lentilles au chèvre", cat: "dîner", temps: "15 min", ig: "Bas", conseil: "Lentilles IG très bas + fromage" },
  { nom: "Pomme + beurre d'amande", cat: "snack", temps: "2 min", ig: "Bas", conseil: "Lipides ralentissent le sucre de la pomme" },
  { nom: "Yaourt grec + noix", cat: "snack", temps: "2 min", ig: "Très bas", conseil: "Protéines + lipides, zéro pic" },
  { nom: "Œuf dur + crudités", cat: "snack", temps: "2 min", ig: "Très bas", conseil: "Zéro glucides, très rassasiant" },
  { nom: "Houmous + bâtonnets légumes", cat: "snack", temps: "2 min", ig: "Bas", conseil: "Pois chiches IG bas + fibres" },
];

const platsAEviter = [
  { nom: "Céréales + lait + jus d'orange", cat: "petit-déj", ig: "Très élevé", pourquoi: "Triple pic : céréales IG 85 + jus sans fibres", alternative: "Œufs + avocat" },
  { nom: "Tartines confiture + jus", cat: "petit-déj", ig: "Très élevé", pourquoi: "Pain blanc IG 85 + confiture + jus", alternative: "Pain complet + avocat + œuf" },
  { nom: "Croissant / pain au chocolat", cat: "petit-déj", ig: "Élevé", pourquoi: "Farine blanche + sucre, pas de protéines", alternative: "Avec œufs pour ralentir" },
  { nom: "Galettes de riz + confiture", cat: "petit-déj", ig: "Très élevé", pourquoi: "Galettes = IG 85, pire que le pain !", alternative: "Pain complet + beurre d'amande" },
  { nom: "Pâtes blanches sauce tomate seule", cat: "déjeuner", ig: "Élevé", pourquoi: "Que des glucides, rien pour ralentir", alternative: "Pâtes complètes + poulet + légumes" },
  { nom: "Sandwich baguette jambon", cat: "déjeuner", ig: "Très élevé", pourquoi: "Baguette IG 95 !", alternative: "Salade complète + petit pain complet" },
  { nom: "Burger + frites + soda", cat: "déjeuner", ig: "Très élevé", pourquoi: "Pain + frites + soda = catastrophe", alternative: "Burger sans pain + salade + eau" },
  { nom: "Pizza classique", cat: "déjeuner", ig: "Élevé", pourquoi: "Pâte blanche = beaucoup de glucides IG élevé", alternative: "Grande salade AVANT, puis 1-2 parts max" },
  { nom: "Gratin dauphinois", cat: "dîner", ig: "Très élevé", pourquoi: "Pomme de terre IG 90 en gratin", alternative: "Gratin de chou-fleur" },
  { nom: "Sushi (grande quantité)", cat: "dîner", ig: "Élevé", pourquoi: "Riz à sushi IG élevé, quantité importante", alternative: "Sashimi + soupe miso + 4-6 sushis max" },
  { nom: "Pâtes carbonara (grande assiette)", cat: "dîner", ig: "Élevé", pourquoi: "Trop de pâtes blanches", alternative: "Courgettes spaghetti ou petite portion + salade avant" },
  { nom: "Biscuits / gâteaux", cat: "snack", ig: "Élevé", pourquoi: "Sucre + farine raffinée", alternative: "Chocolat noir 85% + amandes" },
  { nom: "Barre de céréales", cat: "snack", ig: "Élevé", pourquoi: "Sucre caché (sirop de glucose)", alternative: "Noix + quelques baies" },
  { nom: "Jus de fruits / smoothie acheté", cat: "snack", ig: "Élevé", pourquoi: "Sucre liquide sans fibres", alternative: "Fruit entier + yaourt" },
];

const menusPredefinis = [
  {
    nom: "🌿 Journée Équilibrée",
    desc: "Simple et efficace",
    repas: [
      { moment: "🌅 Petit-déj", plat: "Œufs brouillés + avocat + tomates", ordre: "Tomates → Œufs + avocat" },
      { moment: "☀️ Déjeuner", plat: "Saumon + légumes rôtis + quinoa", ordre: "1. Légumes → 2. Saumon → 3. Quinoa" },
      { moment: "🍎 Snack", plat: "Yaourt grec + amandes", ordre: "-" },
      { moment: "🌙 Dîner", plat: "Poulet + ratatouille (sans féculents)", ordre: "1. Ratatouille → 2. Poulet" },
    ]
  },
  {
    nom: "⚡ Journée Express",
    desc: "Peu de temps de préparation",
    repas: [
      { moment: "🌅 Petit-déj", plat: "Yaourt grec + noix + myrtilles", ordre: "Tout ensemble" },
      { moment: "☀️ Déjeuner", plat: "Sardines + salade + avocat + pain complet", ordre: "1. Salade → 2. Sardines + avocat → 3. Pain" },
      { moment: "🍎 Snack", plat: "Pomme + beurre d'amande", ordre: "-" },
      { moment: "🌙 Dîner", plat: "Omelette champignons + salade verte", ordre: "1. Salade → 2. Omelette" },
    ]
  },
];

const ordreRepas = [
  { etape: "1️⃣", titre: "LÉGUMES / CRUDITÉS", desc: "Salade, légumes cuits, soupe...", why: "Les fibres créent un gel qui ralentit l'absorption" },
  { etape: "2️⃣", titre: "PROTÉINES", desc: "Viande, poisson, œufs, fromage...", why: "Ralentissent encore plus et apportent la satiété" },
  { etape: "3️⃣", titre: "LIPIDES", desc: "Avocat, huile d'olive, noix...", why: "Ralentissent la vidange gastrique" },
  { etape: "4️⃣", titre: "GLUCIDES en DERNIER", desc: "Pain, riz, pâtes, patate douce...", why: "Absorption ralentie → pic réduit de 30-50%" },
];

const astuces = [
  { titre: "Vinaigre de cidre", desc: "1-2 c. à soupe dans l'eau AVANT le repas = -20-30% de pic" },
  { titre: "Marche après manger", desc: "10-15 min = les muscles captent le glucose SANS insuline" },
  { titre: "Manger lentement", desc: "20-30 min minimum = absorption plus progressive" },
  { titre: "Jamais de glucides seuls", desc: "Toujours avec protéines ou lipides" },
  { titre: "Riz/patate refroidis", desc: "Cuire → frigo → réchauffer = IG réduit" },
];

export default function App() {
  const [tab, setTab] = useState('menus');
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [filter, setFilter] = useState('tous');
  const [ingredients, setIngredients] = useState('');
  const [menuGenere, setMenuGenere] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repasType, setRepasType] = useState('journée');
  const [historique, setHistorique] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    repas: '',
    aliments: '',
    glycemieAvant: '',
    glycemieApres: '',
    notes: ''
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('glycemie-historique');
      if (saved) setHistorique(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('glycemie-historique', JSON.stringify(historique));
    }
  }, [historique]);

  const cats = ['tous', 'petit-déj', 'déjeuner', 'dîner', 'snack'];
  const getFiltered = (list) => filter === 'tous' ? list : list.filter(p => p.cat === filter);

  const genererMenu = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);
    setMenuGenere(null);
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          messages: [{
            role: 'user',
            content: `Tu es un expert en nutrition pour diabétiques de type 1. L'utilisateur a ces ingrédients: ${ingredients}. Génère un menu ${repasType === 'journée' ? 'pour toute la journée (petit-déj, déjeuner, snack, dîner)' : 'pour le ' + repasType} optimisé pour une glycémie stable. Utilise UNIQUEMENT ces ingrédients. Indique l'ordre (légumes d'abord, protéines, glucides en dernier). Réponds en JSON: {"repas":[{"moment":"🌅 Petit-déj","plat":"...","ordre":"1. x → 2. y","conseil":"..."}],"astuce_generale":"..."}`
          }]
        })
      });
      const data = await response.json();
      const content = data.content[0].text;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) setMenuGenere(JSON.parse(jsonMatch[0]));
    } catch (error) {
      setMenuGenere({ error: "Erreur. Réessaie !" });
    }
    setLoading(false);
  };

  const ajouterEntree = () => {
    if (!newEntry.aliments || !newEntry.glycemieAvant || !newEntry.glycemieApres) return;
    const entry = {
      ...newEntry,
      id: Date.now(),
      delta: parseInt(newEntry.glycemieApres) - parseInt(newEntry.glycemieAvant),
      glycemieAvant: parseInt(newEntry.glycemieAvant),
      glycemieApres: parseInt(newEntry.glycemieApres)
    };
    setHistorique([entry, ...historique]);
    setNewEntry({ date: new Date().toISOString().split('T')[0], repas: '', aliments: '', glycemieAvant: '', glycemieApres: '', notes: '' });
    setShowForm(false);
  };

  const supprimerEntree = (id) => setHistorique(historique.filter(e => e.id !== id));

  const getStats = () => {
    if (historique.length === 0) return null;
    const deltas = historique.map(e => e.delta);
    const moyenne = Math.round(deltas.reduce((a, b) => a + b, 0) / deltas.length);
    const meilleur = historique.reduce((best, e) => e.delta < best.delta ? e : best, historique[0]);
    return { moyenne, meilleur, total: historique.length };
  };

  const getDeltaColor = (delta) => {
    if (delta <= 30) return 'text-green-600 bg-green-50';
    if (delta <= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-emerald-800">🍽️ Mon Guide Glycémie</h1>
          <p className="text-emerald-600 text-sm">Quoi manger, quand et comment</p>
        </div>

        <div className="flex bg-white rounded-xl p-1 mb-4 shadow-md text-xs">
          {[
            { id: 'menus', label: '📅 Menus' },
            { id: 'generateur', label: '🤖 Générer' },
            { id: 'tracker', label: '📊 Tracker' },
            { id: 'favoriser', label: '✅ OK' },
            { id: 'eviter', label: '❌ Éviter' },
            { id: 'guide', label: '📖 Guide' },
          ].map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setSelectedMenu(null); }}
              className={`flex-1 py-2 px-1 rounded-lg font-medium transition ${tab === t.id ? 'bg-emerald-500 text-white' : 'text-gray-600'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4">
          
          {tab === 'menus' && (
            selectedMenu ? (
              <div>
                <button onClick={() => setSelectedMenu(null)} className="text-emerald-600 mb-3">← Retour</button>
                <h2 className="text-lg font-bold text-emerald-800">{selectedMenu.nom}</h2>
                <p className="text-gray-500 text-sm mb-4">{selectedMenu.desc}</p>
                {selectedMenu.repas.map((r, i) => (
                  <div key={i} className="mb-4 p-3 bg-emerald-50 rounded-xl border-l-4 border-emerald-400">
                    <p className="font-bold text-emerald-800">{r.moment}</p>
                    <p className="text-gray-700 mt-1">{r.plat}</p>
                    {r.ordre !== "-" && <p className="text-sm text-emerald-700 mt-2 bg-emerald-100 rounded p-2">📋 Ordre : {r.ordre}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <h2 className="font-bold text-emerald-800 mb-2">Journées types</h2>
                {menusPredefinis.map((m, i) => (
                  <div key={i} onClick={() => setSelectedMenu(m)} className="p-4 rounded-xl border-2 border-emerald-100 hover:border-emerald-300 cursor-pointer transition">
                    <h3 className="font-bold text-emerald-800">{m.nom}</h3>
                    <p className="text-sm text-gray-500">{m.desc}</p>
                  </div>
                ))}
              </div>
            )
          )}

          {tab === 'generateur' && (
            <div>
              <h2 className="font-bold text-emerald-800 mb-3">🤖 Génère ton menu personnalisé</h2>
              <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ex: œufs, poulet, brocoli, avocat, riz..."
                className="w-full p-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:outline-none mb-4" rows={3} />
              <div className="flex flex-wrap gap-2 mb-4">
                {['journée', 'petit-déj', 'déjeuner', 'dîner', 'snack'].map(type => (
                  <button key={type} onClick={() => setRepasType(type)}
                    className={`px-3 py-1 rounded-full text-sm ${repasType === type ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}>
                    {type === 'journée' ? '📅 Journée' : type}
                  </button>
                ))}
              </div>
              <button onClick={genererMenu} disabled={loading || !ingredients.trim()}
                className="w-full py-3 bg-emerald-500 text-white rounded-xl font-medium disabled:opacity-50">
                {loading ? '⏳ Génération...' : '✨ Générer mon menu'}
              </button>
              {menuGenere && !menuGenere.error && (
                <div className="mt-4 space-y-3">
                  {menuGenere.repas?.map((r, i) => (
                    <div key={i} className="p-3 bg-emerald-50 rounded-xl border-l-4 border-emerald-400">
                      <p className="font-bold text-emerald-800">{r.moment}</p>
                      <p className="text-gray-700 mt-1">{r.plat}</p>
                      <p className="text-sm text-emerald-700 mt-2 bg-emerald-100 rounded p-2">📋 {r.ordre}</p>
                      {r.conseil && <p className="text-sm text-amber-700 mt-1">💡 {r.conseil}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'tracker' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-emerald-800">📊 Suivi glycémie</h2>
                <button onClick={() => setShowForm(!showForm)} className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-sm">
                  {showForm ? '✕' : '+ Ajouter'}
                </button>
              </div>
              {showForm && (
                <div className="mb-4 p-4 bg-gray-50 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="date" value={newEntry.date} onChange={(e) => setNewEntry({...newEntry, date: e.target.value})} className="p-2 border rounded-lg text-sm" />
                    <select value={newEntry.repas} onChange={(e) => setNewEntry({...newEntry, repas: e.target.value})} className="p-2 border rounded-lg text-sm">
                      <option value="">Repas...</option>
                      <option value="petit-déj">🌅 Petit-déj</option>
                      <option value="déjeuner">☀️ Déjeuner</option>
                      <option value="snack">🍎 Snack</option>
                      <option value="dîner">🌙 Dîner</option>
                    </select>
                  </div>
                  <input type="text" value={newEntry.aliments} onChange={(e) => setNewEntry({...newEntry, aliments: e.target.value})} placeholder="Qu'as-tu mangé ?" className="w-full p-2 border rounded-lg text-sm" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="number" value={newEntry.glycemieAvant} onChange={(e) => setNewEntry({...newEntry, glycemieAvant: e.target.value})} placeholder="Avant (mg/dL)" className="p-2 border rounded-lg text-sm" />
                    <input type="number" value={newEntry.glycemieApres} onChange={(e) => setNewEntry({...newEntry, glycemieApres: e.target.value})} placeholder="Après (mg/dL)" className="p-2 border rounded-lg text-sm" />
                  </div>
                  <input type="text" value={newEntry.notes} onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})} placeholder="Notes (optionnel)" className="w-full p-2 border rounded-lg text-sm" />
                  <button onClick={ajouterEntree} className="w-full py-2 bg-emerald-500 text-white rounded-lg">✓ Enregistrer</button>
                </div>
              )}
              {stats && (
                <div className="mb-4 p-4 bg-emerald-50 rounded-xl">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-xs text-gray-500">Moyenne</p>
                      <p className={`text-lg font-bold ${stats.moyenne <= 30 ? 'text-green-600' : stats.moyenne <= 50 ? 'text-yellow-600' : 'text-red-600'}`}>+{stats.moyenne}</p>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-xs text-gray-500">Meilleur</p>
                      <p className="text-lg font-bold text-green-600">+{stats.meilleur?.delta || 0}</p>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-lg font-bold text-emerald-600">{stats.total}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {historique.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Clique sur "+ Ajouter" !</p>
                ) : historique.map((entry) => (
                  <div key={entry.id} className={`p-3 rounded-xl border ${getDeltaColor(entry.delta)}`}>
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{entry.aliments}</p>
                        <p className="text-xs text-gray-500">{entry.date} • {entry.repas}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">+{entry.delta}</p>
                        <p className="text-xs">{entry.glycemieAvant}→{entry.glycemieApres}</p>
                      </div>
                    </div>
                    <button onClick={() => supprimerEntree(entry.id)} className="text-xs text-red-500 mt-1">Supprimer</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'favoriser' && (
            <div>
              <h2 className="font-bold text-emerald-800 mb-3">✅ Plats à favoriser</h2>
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {cats.map(c => (
                  <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${filter === c ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}>
                    {c === 'tous' ? 'Tous' : c}
                  </button>
                ))}
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {getFiltered(platsAFavoriser).map((p, i) => (
                  <div key={i} className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex justify-between">
                      <span className="font-medium text-emerald-800">{p.nom}</span>
                      <span className="text-xs bg-emerald-200 text-emerald-800 px-2 py-1 rounded-full">{p.ig}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">⏱️ {p.temps}</p>
                    <p className="text-sm text-emerald-700 mt-2">💡 {p.conseil}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'eviter' && (
            <div>
              <h2 className="font-bold text-red-800 mb-3">❌ Plats à éviter</h2>
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {cats.map(c => (
                  <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${filter === c ? 'bg-red-500 text-white' : 'bg-gray-100'}`}>
                    {c === 'tous' ? 'Tous' : c}
                  </button>
                ))}
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {getFiltered(platsAEviter).map((p, i) => (
                  <div key={i} className="p-3 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex justify-between">
                      <span className="font-medium text-red-800">{p.nom}</span>
                      <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">{p.ig}</span>
                    </div>
                    <p className="text-sm text-red-700 mt-2">⚠️ {p.pourquoi}</p>
                    <p className="text-sm text-emerald-700 mt-1">✅ {p.alternative}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'guide' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-bold text-emerald-800 mb-3">📋 L'ordre des aliments</h2>
                <div className="space-y-2">
                  {ordreRepas.map((o, i) => (
                    <div key={i} className="p-3 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
                      <p className="font-bold text-emerald-800">{o.etape} {o.titre}</p>
                      <p className="text-sm text-gray-600">{o.desc}</p>
                      <p className="text-xs text-emerald-700">→ {o.why}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-bold text-emerald-800 mb-3">💡 Astuces</h2>
                <div className="space-y-2">
                  {astuces.map((a, i) => (
                    <div key={i} className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <p className="font-medium text-amber-800">{a.titre}</p>
                      <p className="text-sm text-gray-600">{a.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 bg-white rounded-xl p-3 shadow text-center">
          <p className="text-sm text-gray-600">🚶 <strong>10-15 min de marche après le repas</strong> = pic réduit !</p>
        </div>
      </div>
    </div>
  );
}
