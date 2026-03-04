import { AppearanceEditor } from "@/components/appearance-editor";

export const metadata = {
  title: "Appearance | OpenLink",
};

export default function AppearancePage() {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Appearance
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Customize your profile, colors, and button styles.
        </p>
      </div>

      <div className="animate-fade-in-2">
        <AppearanceEditor />
      </div>
    </div>
  );
}
