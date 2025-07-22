"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollText, Shield } from "lucide-react"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState("privacy-policy")

  const navigationItems = [
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      icon: Shield,
    },
    {
      id: "terms-of-service",
      title: "Terms of Service",
      icon: ScrollText,
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Opsi `block: 'start'` memastikan bagian atas elemen sejajar dengan bagian atas viewport.
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["privacy-policy", "terms-of-service"]
      // Offset 150px untuk menandai navigasi aktif sedikit sebelum section mencapai bagian paling atas.
      const scrollPosition = window.scrollY + 150 

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Legal Information</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please review our privacy policy and terms of service to understand how we protect your data and outline the
              terms of using our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigasi Sticky */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Navigation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {navigationItems.map((item) => {
                      const IconComponent = item.icon
                      return (
                        <Button
                          key={item.id}
                          variant={activeSection === item.id ? "default" : "ghost"}
                          className="w-full justify-start text-left"
                          onClick={() => scrollToSection(item.id)}
                        >
                          <IconComponent className="h-4 w-4 mr-3" />
                          {item.title}
                        </Button>
                      )
                    })}
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Konten Utama */}
            <div className="lg:col-span-3 space-y-8">
              {/* Privacy Policy */}
              <Card id="privacy-policy">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                    <Shield className="h-6 w-6 mr-3 text-primary" />
                    Privacy Policy
                  </CardTitle>
                  <p className="text-muted-foreground">Last updated: July 22, 2025</p>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <section>
                    <h2>Introduction</h2>
                    <p>
                      Welcome to MathGrit. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. By using the service, you agree to the collection and use of information in accordance with this policy.
                    </p>
                  </section>
                  <section>
                    <h2>Information We Collect</h2>
                    <h3>Personal Information</h3>
                    <p>
                      We may collect personally identifiable information, such as your name, email address, and other details that you provide to us when you register for an account or participate in activities on the site.
                    </p>
                    <h3>Usage Data</h3>
                    <p>
                      We may also collect information that your browser sends whenever you visit our Service ("Usage Data"). This Usage Data may include information such as your computer's IP address, browser type, browser version, the pages of our Service that you visit, and other diagnostic data.
                    </p>
                  </section>
                  <section>
                    <h2>How We Use Your Information</h2>
                    <p>
                      We use the information we collect to operate, maintain, and provide you with the features and functionality of the Service. This includes:
                    </p>
                    <ul>
                      <li>To provide and maintain our service</li>
                      <li>To notify you about changes to our service</li>
                      <li>To provide customer support</li>
                      <li>To gather analysis or valuable information to improve our service</li>
                    </ul>
                  </section>
                  <section>
                    <h2>Data Security</h2>
                    <p>
                      The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                    </p>
                  </section>
                  <section>
                    <h2>Contact Us</h2>
                    <p>
                      If you have any questions about this Privacy Policy, please contact us at:
                    </p>
                    <div className="not-prose mt-4 p-4 bg-muted rounded-lg">
                      <p><strong>Email:</strong> privacy@mathgrit.com</p>
                      <p><strong>Address:</strong> 123 Education Street, Learning City, LC 12345</p>
                    </div>
                  </section>
                </CardContent>
              </Card>

              {/* Terms of Service */}
              <Card id="terms-of-service">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                    <ScrollText className="h-6 w-6 mr-3 text-primary" />
                    Terms of Service
                  </CardTitle>
                  <p className="text-muted-foreground">Last updated: July 22, 2025</p>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                    <section>
                        <h2>Agreement to Terms</h2>
                        <p>
                            By using our services ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these terms, please do not use our services. We may update these Terms from time to time, and your continued use of the Service constitutes acceptance of those changes.
                        </p>
                    </section>
                    <section>
                        <h2>User Accounts</h2>
                        <h3>Account Creation</h3>
                        <p>
                            You must provide accurate and complete information when creating an account. You are responsible for safeguarding your account password and for all activities that occur under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                        </p>
                    </section>
                    <section>
                        <h2>Prohibited Activities</h2>
                        <p>
                            You agree not to engage in any of the following prohibited activities:
                        </p>
                        <ul>
                            <li>Violating any applicable laws or regulations.</li>
                            <li>Transmitting any harmful or malicious code, such as viruses or worms.</li>
                            <li>Attempting to gain unauthorized access to our systems or user accounts.</li>
                            <li>Harassing, abusing, or harming another person or group.</li>
                        </ul>
                    </section>
                    <section>
                        <h2>Termination</h2>
                        <p>
                            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </section>
                    <section>
                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about these Terms of Service, please contact us at:
                        </p>
                        <div className="not-prose mt-4 p-4 bg-muted rounded-lg">
                           <p><strong>Email:</strong> legal@mathgrit.com</p>
                           <p><strong>Address:</strong> 123 Education Street, Learning City, LC 12345</p>
                        </div>
                    </section>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}