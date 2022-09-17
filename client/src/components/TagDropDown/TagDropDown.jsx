import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

//Internal Import
import TagRequest from "../../APIRequest/TagRequest";

const TagDropDown = (props) => {
  useEffect(() => {
    TagRequest.selectAllTagRequest();
  }, []);

  const { TagList } = useSelector((state) => state?.Tag);

  const allTags =
    TagList &&
    TagList?.map((tag) => {
      return {
        label: tag?.name,
        value: tag?._id,
      };
    });

  const handleChange = (value) => {
    const list = value.map((v) => {
      return v.value;
    });

    props.onChange("tagsId", list.toString());
  };
  const handleBlur = (value) => {
    props.onBlur("tagsId", true);
  };

  return (
    <Select
      isMulti
      name="tagsId"
      id="tagsId"
      onChange={handleChange}
      onBlur={handleBlur}
      options={allTags}
      defaultValue={[allTags[0], allTags[1]]}
    />
  );
};

export default TagDropDown;
