'use client' //el pathname solo lo nodemon recuperar en el cliente y no en el servidor por lo tanto se escribe 'use client'
import {UserGroupIcon, HomeIcon,DocumentDuplicateIcon,} from '@heroicons/react/24/outline'; //estos son iconos atraidos desde Tailwind
import Link from 'next/link';
import {usePathname} from 'next/navigation';


const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {name: 'Invoices',href: '/dashboard/invoices',icon: DocumentDuplicateIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];



export default function NavLinks() {
    const pathname=usePathname(); //'/dashboard/invoices' me envia el enlace en donde esta actualmente
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link key={link.name} href={link.href}
                        className={`${pathname === link.href ? 'bg-sky-100 text-green-400': 'text-gray-600'}
                            flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3
                            text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start
                            md:p-2 md:px-3 `
                        }
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block ">{link.name}</p>
                    </Link>
                );
            })
            }
        </>
    );
}