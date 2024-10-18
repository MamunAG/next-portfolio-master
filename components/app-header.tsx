"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiX, FiMenu } from "react-icons/fi";
//import HireMeModal from "../HireMeModal";
import logoLight from "../../public/images/logo-light.svg";
import logoDark from "../../public/images/logo-dark.svg";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Save } from "@/actions/hire-me-actions";
import { HireMe } from "@prisma/client";
import { useToast } from "./ui/use-toast";

function AppHeader() {
  const currentPath = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTheme, setTheme] = useThemeSwitcher();
  function toggleMenu() {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id="nav"
      className="sm:container sm:mx-auto"
    >
      {/* Header */}
      <div className="z-10 max-w-screen-lg xl:max-w-screen-xl block sm:flex sm:justify-between sm:items-center py-6">
        {/* Header menu links and small screen hamburger menu */}
        <div className="flex justify-between items-center px-4 sm:px-0">
          <div>
            <Link href="/">
              {activeTheme === "dark" ? (
                // <Image
                <div className="flex items-center">
                  <button
                    type="button"
                    className="py-1 px-2.5 me-2 text-lg font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200"
                    disabled
                  >
                    K
                  </button>
                  <h1 className="p-0 m-0 ml-1 font-semibold text-lg">Kokhon</h1>
                </div>
              ) : (
                <div className="flex items-center">
                  <button
                    type="button"
                    className="py-1 px-2.5 me-2 text-lg font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200"
                    disabled
                  >
                    K
                  </button>
                  <h1 className="p-0 m-0 ml-1 font-semibold text-lg text-white">
                    Khokon
                  </h1>
                </div>
                // 	src={logoDark}
                // 	className="w-36 cursor-pointer"
                // 	alt="Dark Logo"
                // 	width={150}
                // 	height={120}
                // />
                // <Image
                //   src={logoLight}
                //   className="w-36 cursor-pointer"
                //   alt="Dark Logo"
                //   width={150}
                //   height={120}
                // />
              )}
            </Link>
          </div>

          {/* Theme switcher small screen */}
          <div
            onClick={() => setTheme(activeTheme)}
            aria-label="Theme Switcher"
            className="block sm:hidden ml-0 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
          >
            {activeTheme === "dark" ? (
              <FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
            ) : (
              <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
            )}
          </div>

          {/* Small screen hamburger menu */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="focus:outline-none"
              aria-label="Hamburger Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-7 w-7 fill-current text-secondary-dark dark:text-ternary-light"
              >
                {showMenu ? (
                  <FiX className="text-3xl" />
                ) : (
                  <FiMenu className="text-3xl" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Header links small screen */}
        <div
          className={
            showMenu
              ? "block m-0 sm:ml-4 sm:mt-3 md:flex px-5 py-3 sm:p-0 justify-between items-center shadow-lg sm:shadow-none"
              : "hidden"
          }
        >
          <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2">
            <Link href="/projects" aria-label="Projects">
              Projects
            </Link>
          </div>
          <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
            <Link href="/about" aria-label="About Me">
              About Me
            </Link>
          </div>
          <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
            <Link href="/contact" aria-label="Contact">
              Contact
            </Link>
          </div>
          <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
            <Link href="/blogs" aria-label="Blog">
              Blog
            </Link>
          </div>
          <div className="border-t-2 pt-3 sm:pt-0 sm:border-t-0 border-primary-light dark:border-secondary-dark">
            {/* <button
              onClick={showHireMeModal}
              role="button"
              className="font-general-medium sm:hidden block text-left text-md bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-sm px-4 py-2 mt-2 duration-300 w-24"
              aria-label="Hire Me Button"
            >
              Hire Me
            </button> */}
            <HireMeDialog showModal={showModal} setShowModal={setShowModal} />
          </div>
        </div>

        {/* Header links large screen */}
        <div className="font-general-medium hidden m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none">
          <div
            className="block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2"
            aria-label="Projects"
          >
            {currentPath.includes("projects") ? (
              <Link href="/projects">Projects</Link>
            ) : (
              <Link href="/projects" className="text-slate-500">
                Projects
              </Link>
            )}
          </div>
          <div
            className="block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2"
            aria-label="About Me"
          >
            {currentPath.includes("about") ? (
              <Link href="/about">About Me</Link>
            ) : (
              <Link href="/about" className="text-slate-500">
                About Me
              </Link>
            )}
          </div>

          <div
            className="block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2"
            aria-label="Contact"
          >
            {currentPath.includes("contact") ? (
              <Link href="/contact">Contact</Link>
            ) : (
              <Link href="/contact" className="text-slate-500">
                Contact
              </Link>
            )}
          </div>

          <div
            className="block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2"
            aria-label="Blog"
          >
            {currentPath.includes("blogs") ? (
              <Link href="/blogs">Blog</Link>
            ) : (
              <Link href="/blogs" className="text-slate-500">
                Blog
              </Link>
            )}
          </div>
        </div>

        {/* Header right section buttons */}
        <div className="hidden sm:flex justify-between items-center flex-col md:flex-row">
          <div className="hidden md:flex">
            {/* <button
              onClick={showHireMeModal}
              className="text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
              aria-label="Hire Me Button"
            >
              Hire Me
            </button> */}
            <HireMeDialog showModal={showModal} setShowModal={setShowModal} />
          </div>

          {/* Theme switcher large screen */}
          <div
            onClick={() => setTheme(activeTheme)}
            aria-label="Theme Switcher"
            className="ml-8 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
          >
            {activeTheme === "dark" ? (
              <FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
            ) : (
              <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
            )}
          </div>
        </div>
      </div>
      <div>
        {/* {showModal ? (
          <HireMeModal onClose={showHireMeModal} onRequest={showHireMeModal} />
        ) : null}
        {showModal ? showHireMeModal : null} */}
      </div>
    </motion.nav>
  );
}
export function HireMeDialog({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();

  const FormSchema = z.object({
    name: z.string(),
    email: z
      .string({
        required_error: "Email is required.",
      })
      .optional(),
    contactNo: z.string({
      required_error: "Contact number is required.",
    }),
    address: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNo: "",
      address: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const hireMeData: HireMe = {
        id: 0,
        name: data.name,
        email: data.email!,
        contact: data.contactNo,
        address: data.address!,
        createdDate: new Date(),
      };

      console.log(hireMeData);
      const savedRequest = Save(hireMeData);
      form.reset();
      setShowModal(false);

      console.log(savedRequest);
      toast({
        variant: "success",
        description: "Your request has been sent.",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button
          className="text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-7 py-5 duration-300"
          aria-label="Hire Me Button"
        >
          Hire Me
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Hire Me</DialogTitle>
              <DialogDescription>
                Please provide necessary information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Name*</FormLabel>
                      <FormControl className="col-span-3">
                        <Input
                          placeholder="Input your name in here."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Email</FormLabel>
                      <FormControl className="col-span-3">
                        <Input
                          placeholder="Input your email in here."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="contactNo"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Contact*</FormLabel>
                      <FormControl className="col-span-3">
                        <Input
                          placeholder="Input your contact no in here."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Address</FormLabel>
                      <FormControl className="col-span-3">
                        <Textarea
                          placeholder="Input your address in here."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />
              </div>

              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Address
                </Label>
                <Textarea
                  id="username"
                  placeholder="Input your address in here."
                  className="col-span-3"
                />
              </div> */}
            </div>
            <DialogFooter>
              <Button type="submit" className="w-28">
                Send Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AppHeader;
