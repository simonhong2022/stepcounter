import { ISections, all, sections } from "@/type/type";
import { Dropdown } from "semantic-ui-react";

type SectionFilterProps = {
  filterChanged: (value: string) => void;
};

const dropdownSections: ISections[] = all.concat(sections);

export default function SectionFilter(props: SectionFilterProps) {
  const { filterChanged } = props;

  return (
    <Dropdown
      placeholder="Select Section"
      fluid
      selection
      options={dropdownSections}
      onChange={(e, data) => {
        const filterValue = data.value as string;
        filterChanged(filterValue);
      }}
    />
  );
}
