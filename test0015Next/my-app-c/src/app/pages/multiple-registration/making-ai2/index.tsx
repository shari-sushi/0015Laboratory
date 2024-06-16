import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormControl, FormLabel, Input, Button, Box, IconButton } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

type CreateKaraokeData = {
    MovieUrl: string;
    SongName: string;
    SingStart: string;
};

const schema = yup.object().shape({
    karaokeData: yup.array().of(
        yup.object().shape({
            MovieUrl: yup.string().url('URLの形式が正しくありません').required('URLを入力してください'),
            SongName: yup.string().required('曲名を入力してください'),
            SingStart: yup
                .string()
                .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, '時間の形式が正しくありません')
                .required('歌い出し時間を入力してください'),
        })
    ),
});

const KaraokeForm: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<{ karaokeData: CreateKaraokeData[] }>({
        resolver: yupResolver(schema),
        defaultValues: { karaokeData: [{ MovieUrl: '', SongName: '', SingStart: '' }] },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'karaokeData',
    });

    const onSubmit = (data: { karaokeData: CreateKaraokeData[] }) => {
        // ここでバックエンドにデータを送信する処理を記述する
        console.log(data.karaokeData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((item, index) => (
                <Box key={item.id} display="flex" alignItems="center" mb={4}>
                    <FormControl isInvalid={!!errors.karaokeData?.[index]?.MovieUrl}>
                        <FormLabel htmlFor="MovieUrl">MovieUrl</FormLabel>
                        <Input
                            id="MovieUrl"
                            {...register(`karaokeData.${index}.MovieUrl`)}
                            placeholder="MovieUrl"
                        />
                        <FormControl.ErrorMessage>{errors.karaokeData?.[index]?.MovieUrl?.message}</FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.karaokeData?.[index]?.SongName} ml={4}>
                        <FormLabel htmlFor="SongName">SongName</FormLabel>
                        <Input
                            id="SongName"
                            {...register(`karaokeData.${index}.SongName`)}
                            placeholder="SongName"
                        />
                        <FormControl.ErrorMessage>{errors.karaokeData?.[index]?.SongName?.message}</FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.karaokeData?.[index]?.SingStart} ml={4}>
                        <FormLabel htmlFor="SingStart">SingStart</FormLabel>
                        <Input
                            id="SingStart"
                            {...register(`karaokeData.${index}.SingStart`)}
                            placeholder="SingStart"
                        />
                        <FormControl.ErrorMessage>{errors.karaokeData?.[index]?.SingStart?.message}</FormControl.ErrorMessage>
                    </FormControl>

                    <IconButton
                        aria-label="Remove Row"
                        icon={<MinusIcon />}
                        onClick={() => remove(index)}
                        ml={4}
                    />
                </Box>
            ))}

            <Button onClick={() => append({ MovieUrl: '', SongName: '', SingStart: '' })} leftIcon={<AddIcon />}>
                Add Row
            </Button>

            <Button type="submit" colorScheme="teal" mt={4}>
                Submit
            </Button>
        </form>
    );
};

export default KaraokeForm;