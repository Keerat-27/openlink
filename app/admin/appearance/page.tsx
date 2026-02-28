import { AppearanceEditor } from "@/components/appearance-editor";

export const metadata = {
  title: "Appearance | OpenLink",
};

export default function AppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Appearance</h1>
        <p className="text-slate-600 mt-1 text-sm">
          Customize your profile, colors, and button styles.
        </p>
      </div>

      <AppearanceEditor />
    </div>
  );
}
