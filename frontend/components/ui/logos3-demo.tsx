import { Logos3 } from "@/components/ui/logos3"

const demoData = {
  heading: "Trusted by these companies",
  logos: [
    {
      id: "logo-1",
      description: "Company 1",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=100&fit=crop&crop=center",
      className: "h-7 w-auto",
    },
    {
      id: "logo-2",
      description: "Company 2",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&crop=center",
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "Company 3",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=100&fit=crop&crop=center",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "Company 4",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=100&fit=crop&crop=center",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "Company 5",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=100&fit=crop&crop=center",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Company 6",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&h=100&fit=crop&crop=center",
      className: "h-7 w-auto",
    },
    {
      id: "logo-7",
      description: "Company 7",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&h=100&fit=crop&crop=center",
      className: "h-4 w-auto",
    },
    {
      id: "logo-8",
      description: "Company 8",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&h=100&fit=crop&crop=center",
      className: "h-7 w-auto",
    },
  ],
};

function Logos3Demo() {
  return <Logos3 {...demoData} />;
}

export { Logos3Demo };
