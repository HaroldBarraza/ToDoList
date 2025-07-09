export type Note = {
  id: number;
  title: string;
  text: string;
  state: boolean;
  category_id: number | null;
  category_name?: string;
};