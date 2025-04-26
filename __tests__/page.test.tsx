import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/(root)/page";
import ContactPage from "@/app/(root)/contact/page";
import AboutPage from "@/app/(root)/about/page";
import Catalog from "@/app/(root)/catalog/page";
import CheckoutPage from "@/app/(checkout)/checkout/page";
import { SessionProvider } from 'next-auth/react';


describe("Тесты страниц", () => {
  describe("Главная страница (/)", () => {
    it("Отображает заголовок", () => {
      render(
        <HomePage />
      );
      expect(screen.getAllByText(/Лучшие смартфоны/i));
    });
  });

  describe("Страница контактов (/contact)", () => {
    it("Отображает контакты", () => {
      render(
          <ContactPage />
      );
      expect(screen.getAllByText(/Контакты/i));
    });
  });

  describe("Страница о компании (/about)", () => {
    it("Отображает информацию", () => {
      render(
          <AboutPage />
      );
      expect(screen.getAllByText(/О нас/i));
    });
  });

});