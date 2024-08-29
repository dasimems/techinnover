import { TaskProvider } from "@/context/TaskProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import SEO from "@/components/SEO";

export type AppEngineProps = AppProps & {
  Component: {
    title?: string;
    description?: string;
    image?: string;
    imageDescription?: string;
    locale?: string;
  };
};
export default function App({ Component, pageProps }: AppEngineProps) {
  return (
    <TaskProvider>
      <SEO
        title={Component?.title}
        description={Component?.description}
        image={Component?.image}
        imageDescription={Component?.imageDescription}
        locale={Component?.locale}
      />
      <Component {...pageProps} />
      <ToastContainer
        toastClassName="z-[9999]"
        bodyClassName="z-[9999]"
        progressClassName="z-[9999]"
        className="z-[9999]"
      />
    </TaskProvider>
  );
}
