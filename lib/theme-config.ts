import { KeyboardThemeName } from "@/components/ui/keyboard";

export interface ThemeColors {
  color1: string;
  color2: string;
  color3: string;
}

export const THEME_CONFIG: Record<KeyboardThemeName, ThemeColors> = {
  classic: {
    color1: "#1c1c1c",
    color2: "#3d3d3d",
    color3: "#F57644",
  },
  mint: {
    color1: "#0a1f1d",
    color2: "#143d39",
    color3: "#86c8ac",
  },
  royal: {
    color1: "#0a0f1e",
    color2: "#1a2c4a",
    color3: "#e4d440",
  },
  dolch: {
    color1: "#1a1822",
    color2: "#2d2a3a",
    color3: "#d73e42",
  },
  sand: {
    color1: "#2d1a18",
    color2: "#4a2a26",
    color3: "#c94e41",
  },
  scarlet: {
    color1: "#2d1416",
    color2: "#4a1e21",
    color3: "#e1e1e1",
  },
};
