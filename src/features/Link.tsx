import React, { PropsWithChildren } from 'react';

export type LinkProps = { href:string } & PropsWithChildren;

export default function Link({children,href}:LinkProps) {
  return (
    <a href={href} className="text-orange-300 hover:text-orange-600"  >
      {children}
    </a>
  );
}
