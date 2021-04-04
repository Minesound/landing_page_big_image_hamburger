import React from "react";
import {
    ArrayField,
    ArrayInput,
    SimpleFormIterator,
    Datagrid,
    DateField,
    DateInput,
    DeleteButton,
    Edit,
    EditButton,
    ImageField,
    List,
    required,
    RichTextField,
    Show,
    ShowButton,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
    BooleanInput,
    BooleanField,
    SelectInput,
    ReferenceInput,
    ReferenceField,
    ChipField,
    FileInput,
    SingleFieldList,
} from "react-admin";

import RichTextInput from "ra-input-rich-text";
import ImageResize from "quill-image-resize";
import TextArrayField from "./TextArrayField";

export const PhotoList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="title" />
                <DateField source="issuedon" label="Issued On" />
                <BooleanField source="approved" />
                <ShowButton basePath="/astrophotographies" />
                <EditButton basePath="/astrophotographies" />
                <DeleteButton basePath="/astrophotographies" />
            </Datagrid>
        </List>
    );
};

export const PhotoShow = (props) => {
    return (
        <Show {...props} title="Project Show">
            <SimpleShowLayout>
                <TextField source="title" label="Title" />
                <TextField source="instrumentUsed" label="instrument Used" />
                <TextField source="instrumentSettings" label="Instrument Settings" />
                <RichTextField source="description" label="Description" />
                <ImageField source="picURL" label="Image" />
                <ArrayField source="members">
                    <Datagrid>
                        <ReferenceField
                            label="Name"
                            source="user._id"
                            reference="users"
                            linkType="show"
                        >
                            <ChipField source="name" />
                        </ReferenceField>
                        <BooleanField source="accepted" />
                        <BooleanField source="leader" />
                    </Datagrid>
                </ArrayField>
                <TextArrayField source='tags' label='Tags'>
                    <SingleFieldList>
                        <ChipField source='id' />
                    </SingleFieldList>
                </TextArrayField>
                <DateField source="issuedon" label="Issued On" />
                <BooleanField source="approved" />
            </SimpleShowLayout>
        </Show>
    );
};

export const PhotoEdit = (props) => {
    return (
        <Edit title="Edit Project" {...props}>
            <SimpleForm redirect="/astrophotographies">
                <TextInput disabled label="Id" source="id" />
                <TextInput source="instrumentUsed" label="instrument Used" />
                <TextInput source="instrumentSettings" label="Instrument Settings" />
                <TextInput source="title" validate={required()} label="Title" />
                <RichTextInput
                    source="description"
                    validate={required()}
                    label="Description"
                    modules={{
                        imageResize: {
                            displaySize: true,
                        },
                    }}
                    options={{
                        modules: {
                            imageResize: ImageResize,
                            toolbar: [
                                ["bold", "italic", "underline", "strike"],
                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                [{ size: ["small", false, "large", "huge"] }],
                                [{ font: [] }],
                                [{ color: [] }, { background: [] }],
                                [{ list: "ordered" }, { list: "bullet" }],
                                [{ script: "sub" }, { script: "super" }],
                                ["blockquote", "code-block"],
                                [{ indent: "-1" }, { indent: "+1" }],
                                [{ direction: "rtl" }],
                                [{ align: [] }],
                                ["link", "image", "video"],
                                ["clean"],
                            ],
                        },
                    }}
                />
                <ImageField source="picURL" label="Image Link" disabled />
                <ArrayInput source="members">
                    <SimpleFormIterator>
                        <ReferenceInput label="User" source="user._id" reference="users">
                            <SelectInput optionText="name" />
                        </ReferenceInput>
                        <BooleanInput source="accepted" label="Accepted" />
                        <BooleanInput source="leader" label="Leader" />
                    </SimpleFormIterator>
                </ArrayInput>
                <ArrayInput source="tags" label="Tags">
                    <SimpleFormIterator>
                        <SelectInput choices={[
                            { id: 'Mercury', name: 'Mercury' }, { id: 'Venus', name: 'Venus' }, { id: 'Earth', name: 'Earth' }, { id: 'Mars', name: 'Mars' }, { id: 'Jupiter', name: 'Jupiter' }, { id: 'Saturn', name: 'Saturn' }, { id: 'Uranus', name: 'Uranus' }, { id: 'Neptune', name: 'Neptune' }, { id: 'Moon', name: 'Moon' }, { id: 'Deep sky objects', name: 'Deep sky objects' }, { id: 'Sun', name: 'Sun' }, { id: 'Star Trails', name: 'Star Trails' }, { id: 'Constellation', name: 'Constellation' }, { id: 'Nebulae', name: 'Nebulae' }, { id: 'Jan', name: 'Jan' }, { id: 'Feb', name: 'Feb' }, { id: 'Mar', name: 'Mar' }, { id: 'Apr', name: 'Apr' }, { id: 'May', name: 'May' }, { id: 'June', name: 'June' }, { name: 'July' }, { id: 'Aug', name: 'Aug' }, { id: 'Sep', name: 'Sep' }, { id: 'Oct', name: 'Oct' }, { id: 'Nov', name: 'Nov' }, { id: 'Dec', name: 'Dec' }
                        ]} />
                    </SimpleFormIterator>
                </ArrayInput>
                <DateInput source="issuedon" label="Issued On" validate={required()} />
                <BooleanInput source="approved" />
            </SimpleForm>
        </Edit>
    );
};