export type AuthFormType = {
  title: string;
  submitLabel: string;
  link?: { href: string; label: string };
  form: { email: string; password: string };
  status: { loading: boolean; error: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};
