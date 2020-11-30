import { Substitution } from "gyloh-webuntis-api";
import React from "react";

export interface SubstitutionViewProps<T> {
	value: T | Substitution<T>;
	current: (current?: T) => React.ReactElement<any, any> | string | number | null | undefined;
	subst: (subst?: T) => React.ReactElement<any, any> | string | number | null | undefined;
}

function isSubstitution<T>(val: any): val is Substitution<T> {
	return typeof val === "object" && "current" in val &&  "subst" in val;
}

function SubstitutionView<T>({ value, current, subst }: SubstitutionViewProps<T>): React.ReactElement {
	if(isSubstitution(value)) 
		return <span>{current(value.current || undefined)} (<s>{subst(value.subst || undefined)}</s>)</span>;
	return <span>{current(value)}</span>
}

export default SubstitutionView;