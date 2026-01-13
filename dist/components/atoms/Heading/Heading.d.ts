import * as React from 'react';
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}
export declare const Heading: React.ForwardRefExoticComponent<HeadingProps & React.RefAttributes<HTMLHeadingElement>>;
export declare const H1: React.ForwardRefExoticComponent<Omit<HeadingProps, "as"> & React.RefAttributes<HTMLHeadingElement>>;
export declare const H2: React.ForwardRefExoticComponent<Omit<HeadingProps, "as"> & React.RefAttributes<HTMLHeadingElement>>;
export declare const H3: React.ForwardRefExoticComponent<Omit<HeadingProps, "as"> & React.RefAttributes<HTMLHeadingElement>>;
export declare const H4: React.ForwardRefExoticComponent<Omit<HeadingProps, "as"> & React.RefAttributes<HTMLHeadingElement>>;
export declare const H5: React.ForwardRefExoticComponent<Omit<HeadingProps, "as"> & React.RefAttributes<HTMLHeadingElement>>;
export declare const H6: React.ForwardRefExoticComponent<Omit<HeadingProps, "as"> & React.RefAttributes<HTMLHeadingElement>>;
