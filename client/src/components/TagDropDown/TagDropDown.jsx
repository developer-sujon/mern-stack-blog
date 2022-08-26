import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { selectAllTagAction } from "../../redux/slices/tagSlice";

//Internal Import

const TagDropDown = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectAllTagAction());
  }, [dispatch]);

  const store = useSelector((state) => state?.tag);
  const { tagList, loading, appErr, serverErr } = store;

  const allTags = tagList?.map((tag) => {
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
    />
  );
};

export default TagDropDown;
