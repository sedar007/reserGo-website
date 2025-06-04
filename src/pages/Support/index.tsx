import { useState } from "react";
        import images from "../../assets/images";

        type Contact = {
          name: string;
          phone: string;
          email: string;
        };

        export default function Support() {
          const [contacts] = useState<Contact[]>([
            { name: "Adjy Sédar", phone: "123-456-7890", email: "contact@adjysedar.fr" },
            { name: "Lala Britta", phone: "987-654-3210", email: "lblfake@mail.com" },
          ]);

          return (
            <div className="min-h-screen bg-white text-black px-4 py-10">
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex justify-center">
                  <img
                    src={images.logoIcon}
                    alt="Logo du site"
                    className="w-40 h-40 md:w-56 md:h-56 hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-center">Support Technique</h1>

                <p className="text-center text-black max-w-xl mx-auto">
                  Si vous avez des questions ou des problèmes, vous pouvez contacter un membre de notre équipe de support
                  ci-dessous.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contacts.map((contact, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-gray-200 bg-white shadow-md p-6 transition hover:shadow-lg"
                    >
                      <p className="text-lg font-semibold mb-2">{contact.name}</p>
                      <p className="text-sm text-black">
                        📞 <strong>Téléphone :</strong> {contact.phone}
                      </p>
                      <p className="text-sm text-black">
                        📧 <strong>Email :</strong> {contact.email}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          );
        }
