// @ts-nocheck
import React from "react";
import 'react-typist/dist/Typist.css';
import Typist from 'react-typist';

interface SkillCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  inView: boolean;
}

export function SkillCard({ icon: Icon, title, children, inView }: SkillCardProps) {
  return (
    <div className="border border-primary-brown rounded-lg overflow-hidden shadow-sm min-h-64">
      <div className="grid justify-center text-center p-4">
        <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full bg-gray-900 p-2.5 text-white shadow">
          <Icon className="h-6 w-6" strokeWidth={2} />
        </div>
        <h5 className="mb-2 text-primary-brown">
          {inView ? (
            <Typist avgTypingDelay={80} cursor={{ show: false }}>
              {title}
            </Typist>
          ) : (
            title
          )}
        </h5>
        <p className="px-8 font-normal !text-gray-500">
          {children}
        </p>
      </div>
    </div>
  );
}

export default SkillCard;
