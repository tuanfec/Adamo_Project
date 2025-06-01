import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container min-h-screen md:px-20 px-6 py-12 mx-auto flex flex-col lg:flex-row justify-center items-center lg:gap-12">
        <div className="w-full lg:w-1/2">
          <p className="text-sm lg:text-2xl md:text-xl font-medium dark:text-[#FF7B42] text-[#70A9C5]">
            404 {t("nofound.404")}
          </p>
          <h1 className="mt-3 text-2xl lg:text-5xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            {t("nofound.header")}
          </h1>
          <p className="mt-4 text-sm lg:text-2xl text-gray-500 dark:text-gray-400">
            {t("nofound.title")}
          </p>

          <div className="flex items-center mt-6 gap-x-3 ">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center cursor-pointer justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>{t("nofound.button")}</span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-1/2 px-5 py-2 text-sm tracking-wide cursor-pointer text-white transition-colors duration-200 bg-[#70A9C5] rounded-lg shrink-0 sm:w-auto hover:bg-[#70a9c5c5] dark:hover:bg-[#ff7b42b9] dark:bg-[#ff7b42ea]">
              {t("nofound.takeHome")}
            </button>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src="https://merakiui.com/images/components/illustration.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};
export default NotFoundPage;
