export type Site = {
  name: string;
  url: string;
  description: string;
};

export type WorkshopSlideContent =
  | { type: "text"; value: string }
  | { type: "code"; value: string; language?: string }
  | { type: "image"; value: string; alt?: string };

export type WorkshopSlide = {
  id: string;
  title: string;
  content: WorkshopSlideContent[];
};

