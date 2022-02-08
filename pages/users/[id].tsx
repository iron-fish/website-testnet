import { useCallback, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import useQuery from 'hooks/useQuery'

import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import Loader from 'components/Loader'
import { Container as OffsetBorderContainer } from 'components/OffsetBorder'
import EventsPaginationButton from 'components/user/EventsPaginationButton'
import FishAvatar from 'components/user/FishAvatar'
import Flag from 'components/user/Flag'
import Tabs, { TabType } from 'components/user/Tabs'
import renderEvents from 'components/user/EventRow'
import usePaginatedEvents from 'hooks/usePaginatedEvents'
import { encode as btoa } from 'base-64'

import * as API from 'apiClient'
import { graffitiToColor, numberToOrdinal } from 'utils'
import { LoginContext } from 'hooks/useLogin'
import { useQueriedToast, Toast, Alignment } from 'hooks/useToast'

const FIXTURE2 = {
  object: 'list',
  data: [
    {
      object: 'event',
      id: 101254,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-08T08:12:31.549Z',
      points: 0,
      user_id: 2651,
      metadata: {
        id: 929836,
        hash: '0000000000000f08071a4c9b11624be08ae80cb64fe8feb7c44b9cf2ae7c1036',
        sequence: 104203,
        previous_block_hash:
          '00000000000bc5281932699132bc52ddfaa2030e0d76121a6f150f87e4129c3a',
        main: true,
        difficulty: 20877175342944,
        transactions_count: 1,
        timestamp: '2022-02-08T08:12:31.549Z',
        graffiti: 'mage41',
        size: 2758,
        time_since_last_block_ms: 56079,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 101139,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-08T06:19:31.994Z',
      points: 0,
      user_id: 2651,
      metadata: {
        id: 929716,
        hash: '000000000002d9e3a031ba7db69d64dbc452c9dea7a90f25e0c1a9be7b7592c4',
        sequence: 104085,
        previous_block_hash:
          '000000000001d8d17552a09f2ceddc34754e35d2aa382653fa4d1710203f4e77',
        main: true,
        difficulty: 20601750749719,
        transactions_count: 1,
        timestamp: '2022-02-08T06:19:31.994Z',
        graffiti: 'mage41',
        size: 2728,
        time_since_last_block_ms: 108172,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 100982,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-08T03:19:53.615Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 929554,
        hash: '000000000006e7383144b7685274409a93fea4be478026dd679dfa3b768e47b3',
        sequence: 103923,
        previous_block_hash:
          '0000000000092cba906b3020a899e99ee5c819f03f27796e1bf68e83136a740f',
        main: true,
        difficulty: 21637359223061,
        transactions_count: 1,
        timestamp: '2022-02-08T03:19:53.615Z',
        graffiti: 'mage41',
        size: 2764,
        time_since_last_block_ms: 16043,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 100935,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-08T02:36:08.260Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 929506,
        hash: '000000000007372bda741ca4e464200e9a95e33044f03d2413bd768ba88516d3',
        sequence: 103875,
        previous_block_hash:
          '000000000007c2aad8d0cbcd4271ffca75288f3d59481bf6f144e75cecfe2ad5',
        main: true,
        difficulty: 21357376315061,
        transactions_count: 1,
        timestamp: '2022-02-08T02:36:08.260Z',
        graffiti: 'mage41',
        size: 2736,
        time_since_last_block_ms: 332551,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 100850,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-08T01:01:43.104Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 929417,
        hash: '000000000003ccc8ddb9afabc2f04de8dca5515baf222b7758d9c93ab9a0f4cf',
        sequence: 103787,
        previous_block_hash:
          '000000000006d0bbc887ec995f4c30384480be3e053aac14bb219f3dc54dced5',
        main: true,
        difficulty: 21775760817192,
        transactions_count: 1,
        timestamp: '2022-02-08T01:01:43.104Z',
        graffiti: 'mage41',
        size: 2756,
        time_since_last_block_ms: 21603,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 100810,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-08T00:18:47.558Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 929376,
        hash: '0000000000024ddd587085554f60a4eb8d73c609eab3bc589a60a4efff3c58cf',
        sequence: 103747,
        previous_block_hash:
          '000000000001019371cb46676f36d56d0077a43b8e31d6c8a93175d09cec2d45',
        main: true,
        difficulty: 21951105929804,
        transactions_count: 1,
        timestamp: '2022-02-08T00:18:47.558Z',
        graffiti: 'mage41',
        size: 2740,
        time_since_last_block_ms: 76831,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 100769,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-07T23:31:00.425Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 929331,
        hash: '0000000000036d99a6ef646d9c46339c1b95084847e371e545900ff1d3caf982',
        sequence: 103702,
        previous_block_hash:
          '000000000009b1edc85d76a783afaa288ab49a19aea2e12a6e227a153c0735ad',
        main: true,
        difficulty: 22147754468210,
        transactions_count: 1,
        timestamp: '2022-02-07T23:31:00.425Z',
        graffiti: 'mage41',
        size: 2756,
        time_since_last_block_ms: 146652,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 100732,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-07T22:53:24.283Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 929294,
        hash: '0000000000009639d2f71b932c012a72f05f9721a565387bb3c585f075f421f7',
        sequence: 103665,
        previous_block_hash:
          '000000000005ac7e69b8f48fe80a5fd8e1baabd7554120d2fe5b3fffe5400053',
        main: true,
        difficulty: 22215368830842,
        transactions_count: 1,
        timestamp: '2022-02-07T22:53:24.283Z',
        graffiti: 'mage41',
        size: 2750,
        time_since_last_block_ms: 10345,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 100682,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-07T21:54:35.754Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 929244,
        hash: '000000000008e0837adff9f98fed61299e56665d18915f74c9a04122b5717552',
        sequence: 103615,
        previous_block_hash:
          '0000000000032f2125b430ba7a874ac0d241f0c8322dd4f6b57bf3375095894f',
        main: true,
        difficulty: 22802724825023,
        transactions_count: 1,
        timestamp: '2022-02-07T21:54:35.754Z',
        graffiti: 'mage41',
        size: 2742,
        time_since_last_block_ms: 4668,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 100283,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-07T15:36:07.873Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 928838,
        hash: '000000000003f2e11517a7c76eeb45077aa9c53444f61e56f43745ba216dc05b',
        sequence: 103211,
        previous_block_hash:
          '000000000003ed19847fce66aafe5ef8bdfe1cd6c1ef7f15309c9a0234593df0',
        main: true,
        difficulty: 21220375595595,
        transactions_count: 1,
        timestamp: '2022-02-07T15:36:07.873Z',
        graffiti: 'mage41',
        size: 2733,
        time_since_last_block_ms: 25078,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 99966,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-07T10:36:30.268Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 928517,
        hash: '00000000000348f206969a59698bb10b74f10454f4b45cd54c36d760b60a722a',
        sequence: 102892,
        previous_block_hash:
          '00000000000636d9bf1110b4c9ae1f8b6dd042f711aed603eaa5295217230458',
        main: true,
        difficulty: 20135055300041,
        transactions_count: 1,
        timestamp: '2022-02-07T10:36:30.268Z',
        graffiti: 'mage41',
        size: 2760,
        time_since_last_block_ms: 27523,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 99345,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-07T00:16:10.600Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 927883,
        hash: '00000000000da4691fcc334c66df056f5078bdd3346da6435984fe594ed8b95f',
        sequence: 102262,
        previous_block_hash:
          '000000000008ae7f51912406ed2785dfc30a0c93a19b216e458fee9912633c2e',
        main: true,
        difficulty: 19571455272410,
        transactions_count: 1,
        timestamp: '2022-02-07T00:16:10.600Z',
        graffiti: 'mage41',
        size: 2758,
        time_since_last_block_ms: 45267,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 93102,
      type: 'COMMUNITY_CONTRIBUTION',
      occurred_at: '2022-02-02T12:28:17.000Z',
      points: 500,
      user_id: 2651,
      metadata: {
        url: 'https://discord.com/channels/771503434028941353/859487131093434438/937398640366989412',
      },
    },
    {
      object: 'event',
      id: 91458,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-01T13:56:24.938Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 919862,
        hash: '00000000000ec98f0a1155d2cff19517496806cab8876524edd416c898f3082b',
        sequence: 94382,
        previous_block_hash:
          '00000000000aff2dd00da0d9704e31a1b7ac4a558b7fae8ad57198f73c83edbd',
        main: true,
        difficulty: 16530875024457,
        transactions_count: 1,
        timestamp: '2022-02-01T13:56:24.938Z',
        graffiti: 'mage41',
        size: 2763,
        time_since_last_block_ms: 66622,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 91005,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-01T06:25:59.058Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 919400,
        hash: '0000000000106e2c738249e2a937fb30abcc6e93cb4299a1060ebf0e37af43e9',
        sequence: 93927,
        previous_block_hash:
          '000000000004bb88824dd92921d3bf3390eb274fb68dca36d27414e7cb2eb586',
        main: true,
        difficulty: 16283750180439,
        transactions_count: 1,
        timestamp: '2022-02-01T06:25:59.058Z',
        graffiti: 'mage41',
        size: 2758,
        time_since_last_block_ms: 549,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 90850,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-01T04:01:09.563Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 919241,
        hash: '00000000000a4bbeaae8f08ea4db42ad5e4e777179d868541568760e4b9737e8',
        sequence: 93770,
        previous_block_hash:
          '000000000011da6d7bf3995cf534e98e97904a30055d84fddb5e4ed772cb7845',
        main: true,
        difficulty: 15699338569000,
        transactions_count: 1,
        timestamp: '2022-02-01T04:01:09.563Z',
        graffiti: 'mage41',
        size: 2749,
        time_since_last_block_ms: 39593,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 90791,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-01T03:07:49.614Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 919181,
        hash: '000000000007fa0e0cdd620735121ce8e2cb67f2f8bb143b93818e54cd356c2d',
        sequence: 93710,
        previous_block_hash:
          '00000000000824243581246c28ae2f201fdb0d129860bf63f4947ad91ed35112',
        main: true,
        difficulty: 15415278448733,
        transactions_count: 1,
        timestamp: '2022-02-01T03:07:49.614Z',
        graffiti: 'mage41',
        size: 2741,
        time_since_last_block_ms: 121678,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 90693,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-01T01:42:41.636Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 919081,
        hash: '0000000000037502b4de1ca96889f70c97a00aacc691bc2a20871afb1912a662',
        sequence: 93611,
        previous_block_hash:
          '000000000010da2232b393722d9220a267823118c1c35f63159c5917591de0c8',
        main: true,
        difficulty: 14800769798537,
        transactions_count: 1,
        timestamp: '2022-02-01T01:42:41.636Z',
        graffiti: 'mage41',
        size: 2729,
        time_since_last_block_ms: 41874,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 90292,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-31T18:32:14.128Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 918675,
        hash: '00000000000e9994e135d48f2d7acb87e167a2ec6812cdf3dfe74a9926339318',
        sequence: 93211,
        previous_block_hash:
          '00000000000576fa8cefc2fde7c3cbc0e608797af13b120a6e580ee4955f1268',
        main: true,
        difficulty: 16199267624996,
        transactions_count: 1,
        timestamp: '2022-01-31T18:32:14.128Z',
        graffiti: 'mage41',
        size: 2752,
        time_since_last_block_ms: 1827,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 90151,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-31T16:16:08.226Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 918530,
        hash: '00000000000cca2832e5a17e4b25e483ebaa04154a0971984bc5a90d55b5a38c',
        sequence: 93070,
        previous_block_hash:
          '000000000005fd75e0e46f0bdd76275e674978d28ff65b7ef35af447808e66fe',
        main: true,
        difficulty: 15933204762351,
        transactions_count: 1,
        timestamp: '2022-01-31T16:16:08.226Z',
        graffiti: 'mage41',
        size: 2761,
        time_since_last_block_ms: 78664,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 89934,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-31T12:55:20.206Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 918309,
        hash: '00000000000c5dd54fe1b6c207ff64c50688765f48ecea59fe9cd7a3c2d6fbf5',
        sequence: 92852,
        previous_block_hash:
          '000000000006506c9953c9bdb00841faaea273eb71e310e081104abb1b597164',
        main: true,
        difficulty: 15223944126003,
        transactions_count: 1,
        timestamp: '2022-01-31T12:55:20.206Z',
        graffiti: 'mage41',
        size: 2737,
        time_since_last_block_ms: 27206,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 89806,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-31T10:39:04.108Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 918179,
        hash: '0000000000087f9db146dfe82d1aa1e4bf5258812528d8f86920881a7dac6e69',
        sequence: 92724,
        previous_block_hash:
          '000000000006510aa747648a301e2e61603c0f06754ccf3af06e7bf87c4ae64c',
        main: true,
        difficulty: 15633584927697,
        transactions_count: 1,
        timestamp: '2022-01-31T10:39:04.108Z',
        graffiti: 'mage41',
        size: 2742,
        time_since_last_block_ms: 7696,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 89632,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-31T08:05:56.872Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 918003,
        hash: '000000000008c880914373e2ee27877ce0e233247fda3096e175a5b48df6f43e',
        sequence: 92552,
        previous_block_hash:
          '00000000000ffecf03913429d234219a99474e231843df9a3f07a1d5a190fb1f',
        main: true,
        difficulty: 14824150734926,
        transactions_count: 1,
        timestamp: '2022-01-31T08:05:56.872Z',
        graffiti: 'mage41',
        size: 2759,
        time_since_last_block_ms: 22379,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 80865,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-25T04:31:18.580Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 909043,
        hash: '00000000000df2b13b430f6804ba5b022f9fbf0081ee1cbd4b4819969b5c98bb',
        sequence: 83679,
        previous_block_hash:
          '000000000007c4786097120b05a0344c186c22edc7589345de2d631704edc032',
        main: true,
        difficulty: 13849667262310,
        transactions_count: 1,
        timestamp: '2022-01-25T04:31:18.580Z',
        graffiti: 'mage41',
        size: 2743,
        time_since_last_block_ms: 67921,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 80816,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-25T03:29:15.055Z',
      points: 100,
      user_id: 2651,
      metadata: {
        id: 908992,
        hash: '00000000000f658544b1aa22a08098a3b455aa0e2bccba1e81d06df4fda3306e',
        sequence: 83629,
        previous_block_hash:
          '0000000000084b8eea0609476c71e36166658dd7ba91dad1fa5ae281e98a0d17',
        main: true,
        difficulty: 14317289226575,
        transactions_count: 1,
        timestamp: '2022-01-25T03:29:15.055Z',
        graffiti: 'mage41',
        size: 2728,
        time_since_last_block_ms: 74463,
        object: 'block',
      },
    },
  ],
  metadata: { has_next: true, has_previous: false },
}

const FIXTURE = {
  object: 'list',
  data: [
    {
      object: 'event',
      id: 101983,
      type: 'COMMUNITY_CONTRIBUTION',
      occurred_at: '2022-02-08T20:25:13.000Z',
      points: 500,
      user_id: 16450,
      metadata: {
        url: 'https://twitter.com/ironfishcrypto/status/1488894441054097410?s=20&t=0nTIoED5Pw0_YS4WfCUoNg ',
      },
    },
    {
      object: 'event',
      id: 98168,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-06T04:34:48.286Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 926656,
        hash: '00000000000f76ebaf09772c8268c2154f27cab2a506d8de8a87c7b9df992a48',
        sequence: 101051,
        previous_block_hash:
          '000000000001566460c5dde53336f2368513b4cf1282b4b9183bdf99bc6b5135',
        main: true,
        difficulty: 18023560479153,
        transactions_count: 1,
        timestamp: '2022-02-06T04:34:48.286Z',
        graffiti: 'CryptDegree',
        size: 2759,
        time_since_last_block_ms: 27327,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 96488,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-05T00:09:41.851Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 924937,
        hash: '00000000000644f7b4486496fc66e210852607c51e6dd540144e8b1aab9359f4',
        sequence: 99356,
        previous_block_hash:
          '000000000000507423a55dd5565e7a867bf3787b535c80c2caef393f039dd016',
        main: true,
        difficulty: 18595987041473,
        transactions_count: 1,
        timestamp: '2022-02-05T00:09:41.851Z',
        graffiti: 'CryptDegree',
        size: 2747,
        time_since_last_block_ms: 61648,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 95520,
      type: 'BLOCK_MINED',
      occurred_at: '2022-02-04T08:21:07.535Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 923938,
        hash: '00000000000ffb299162b6c9d238230482e3e15a6ea41cb932db00d91c9617b7',
        sequence: 98379,
        previous_block_hash:
          '00000000000839c7bcc32a347db2b236ac1b4551e2d29aa8d74ca4fee739c4f2',
        main: true,
        difficulty: 17018097703153,
        transactions_count: 1,
        timestamp: '2022-02-04T08:21:07.535Z',
        graffiti: 'CryptDegree',
        size: 2735,
        time_since_last_block_ms: 26262,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 88734,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-30T16:35:35.403Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 917082,
        hash: '0000000000116a5993cbec7fa6a5fbe909eea68f29af5a1ec8849acd7a06bd9b',
        sequence: 91640,
        previous_block_hash:
          '0000000000069be0090d1d30667928cba6e07d86b0e22c5f33fe345d425f5d4b',
        main: true,
        difficulty: 15701808898352,
        transactions_count: 1,
        timestamp: '2022-01-30T16:35:35.403Z',
        graffiti: 'CryptDegree',
        size: 2722,
        time_since_last_block_ms: 32023,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 85297,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-28T06:43:17.599Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 913549,
        hash: '00000000000b120999c1d6ba6ee27433e3d240d82483a2a72ca99c79572c4a73',
        sequence: 88146,
        previous_block_hash:
          '000000000004b86f25811d76942b2bb3c2909073527d763d76dae335eee57a11',
        main: true,
        difficulty: 14719885212053,
        transactions_count: 2,
        timestamp: '2022-01-28T06:43:17.599Z',
        graffiti: 'CryptDegree',
        size: 7750,
        time_since_last_block_ms: 72120,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 81653,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-25T17:27:20.095Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 909847,
        hash: '0000000000090509b93c4aed27b1f3140bf31c02bfaad8ee6eeefb3b0bdfe28a',
        sequence: 84474,
        previous_block_hash:
          '00000000000fca3e518e0f836cc566ac63faf75d63cfcbabaaac50d607f56814',
        main: true,
        difficulty: 14685185377234,
        transactions_count: 1,
        timestamp: '2022-01-25T17:27:20.095Z',
        graffiti: 'CryptDegree',
        size: 2747,
        time_since_last_block_ms: 22208,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 81153,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-25T09:11:55.806Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 909334,
        hash: '00000000001369f89fc61e505e608ba8cb523a02ce96a23f56f286ec8f966892',
        sequence: 83966,
        previous_block_hash:
          '00000000000a1d84dcd314566132dbc3def16cb050f80517d2ce21d820d15354',
        main: true,
        difficulty: 14114148369253,
        transactions_count: 1,
        timestamp: '2022-01-25T09:11:55.806Z',
        graffiti: 'CryptDegree',
        size: 2737,
        time_since_last_block_ms: 146391,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 74947,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-21T07:42:54.354Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 902962,
        hash: '000000000031a4869392e34ec860a6ad6b9b80cc2a4a2acfe347b373506e488f',
        sequence: 77641,
        previous_block_hash:
          '000000000039dbc6eb0819bef42d655759074ddbacc78b99277823eb182aead5',
        main: true,
        difficulty: 3439979138183,
        transactions_count: 1,
        timestamp: '2022-01-21T07:42:54.354Z',
        graffiti: 'CryptDegree',
        size: 2737,
        time_since_last_block_ms: 19034,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 70313,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-18T09:06:14.829Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 898124,
        hash: '0000000000fc5e4b7f83de5240c3d865ee4774f51978c42da7c3a90bb1701f91',
        sequence: 72881,
        previous_block_hash:
          '000000000060fc4fe938846087efc8ac4fe72b8ec6391c418369ec2c1924b424',
        main: true,
        difficulty: 757244826254,
        transactions_count: 1,
        timestamp: '2022-01-18T09:06:14.829Z',
        graffiti: 'CryptDegree',
        size: 2748,
        time_since_last_block_ms: 33707,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 69343,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-17T16:02:50.132Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 897105,
        hash: '0000000000979ea271c1a94b35dd6f5023a248d1e3519104fd2c41d27dfa8396',
        sequence: 71876,
        previous_block_hash:
          '000000000131aaeddf222faeb825277d3495d38eb9e29dad96f6c21dd1dbcf24',
        main: true,
        difficulty: 796190059774,
        transactions_count: 1,
        timestamp: '2022-01-17T16:02:50.132Z',
        graffiti: 'CryptDegree',
        size: 2747,
        time_since_last_block_ms: 5422,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 66686,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-15T19:35:00.292Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 894356,
        hash: '00000000013bbe69a103319a9a7ecb9c3e3e12ac21082d4831f184086dbfe258',
        sequence: 69156,
        previous_block_hash:
          '00000000015414b0ce628067b88fd9a78961e0b1a8e65b70799421cdd21eb2d9',
        main: true,
        difficulty: 687544946723,
        transactions_count: 1,
        timestamp: '2022-01-15T19:35:00.292Z',
        graffiti: 'CryptDegree',
        size: 2768,
        time_since_last_block_ms: 6983,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 65388,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-14T21:09:08.647Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 892997,
        hash: '000000000193b83f5378e9767868109179955ff1dd49fe0205182f3bd616a867',
        sequence: 67808,
        previous_block_hash:
          '0000000000af6b47e4401a341f34853cfbe8e32bbfbed59c5734537dff67094f',
        main: true,
        difficulty: 687783375612,
        transactions_count: 1,
        timestamp: '2022-01-14T21:09:08.647Z',
        graffiti: 'CryptDegree',
        size: 2754,
        time_since_last_block_ms: 3058,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 63983,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-13T22:11:30.663Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 891531,
        hash: '00000000002b81754abda9e3e43cbcd9e64ececafd1ab12bf279a9e8b80ab7a9',
        sequence: 66364,
        previous_block_hash:
          '00000000012da63ddf902b362b5a527467f7c377e3d15ab6f807167cca44c814',
        main: true,
        difficulty: 566747776547,
        transactions_count: 1,
        timestamp: '2022-01-13T22:11:30.663Z',
        graffiti: 'CryptDegree',
        size: 2747,
        time_since_last_block_ms: 17464,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 62109,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-12T14:23:02.717Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 889595,
        hash: '00000000002b12ab13358b51d6b82800d62e4b7a6f4c38acc2d366439455df54',
        sequence: 64448,
        previous_block_hash:
          '00000000010783b9426b97977d9768ffbf79d3d2664312b15c9f054a9eeeabde',
        main: true,
        difficulty: 553105672823,
        transactions_count: 1,
        timestamp: '2022-01-12T14:23:02.717Z',
        graffiti: 'CryptDegree',
        size: 2764,
        time_since_last_block_ms: 105972,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 59781,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-11T00:15:28.440Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 887142,
        hash: '00000000007274dd5f7540ba0efb3de548d4e3f7d4c84403ce23883a4aa54802',
        sequence: 62183,
        previous_block_hash:
          '0000000000a81babc7c8f1779e7b16c88422ec810fdfcd75358f8fd21ae5d072',
        main: true,
        difficulty: 605498100152,
        transactions_count: 1,
        timestamp: '2022-01-11T00:15:28.440Z',
        graffiti: 'CryptDegree',
        size: 2747,
        time_since_last_block_ms: 25243,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 58408,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-10T00:45:47.307Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 885664,
        hash: '0000000001c4250453277b3593930d741eb66511f89f22ede17d0a25aebc15fe',
        sequence: 60764,
        previous_block_hash:
          '00000000001be0fffa7aaffda9077d3ac972e2e3a5e0f0c291bc46fe514e82c1',
        main: true,
        difficulty: 594026179081,
        transactions_count: 1,
        timestamp: '2022-01-10T00:45:47.307Z',
        graffiti: 'CryptDegree',
        size: 2737,
        time_since_last_block_ms: 22846,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 58020,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-09T18:26:03.641Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 885255,
        hash: '000000000107f0f53577648b43733a1a648695a3f7bceb3a6fb7c35c377bd245',
        sequence: 60355,
        previous_block_hash:
          '000000000145c21ddf900a55a2e2c622250ecca9a489667e8c4c9f32edf025a6',
        main: true,
        difficulty: 544326746385,
        transactions_count: 1,
        timestamp: '2022-01-09T18:26:03.641Z',
        graffiti: 'CryptDegree',
        size: 2728,
        time_since_last_block_ms: 162511,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 57973,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-09T17:32:10.947Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 885206,
        hash: '0000000000486c64dbfeabad240d3cd9a174a4c79bfd756c70c0f230c6c99be7',
        sequence: 60306,
        previous_block_hash:
          '00000000012ddc47a88520c9dbeddd279e78443611b6402bafe342779f1d8af0',
        main: true,
        difficulty: 551930096203,
        transactions_count: 1,
        timestamp: '2022-01-09T17:32:10.947Z',
        graffiti: 'CryptDegree',
        size: 2730,
        time_since_last_block_ms: 17164,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 57519,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-09T09:49:38.832Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 884735,
        hash: '000000000073c042095f974f5a4e5ce5afe04451065ff5f16910cad41348b925',
        sequence: 59835,
        previous_block_hash:
          '0000000000f1d3953999482e05a594901cf327d6ad7fb4ca3b035a6f6dd57ff9',
        main: true,
        difficulty: 538371611275,
        transactions_count: 1,
        timestamp: '2022-01-09T09:49:38.832Z',
        graffiti: 'CryptDegree',
        size: 2731,
        time_since_last_block_ms: 29722,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 57114,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-09T02:45:43.915Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 884307,
        hash: '0000000000c27193decc29ed70c75fb5a428345831e5abde5f35ccf58f37d57f',
        sequence: 59407,
        previous_block_hash:
          '00000000017e982dd2d51b8acf4c34eee21aa4cad9af177ff5a5b80d1d3c6b41',
        main: true,
        difficulty: 532652601310,
        transactions_count: 1,
        timestamp: '2022-01-09T02:45:43.915Z',
        graffiti: 'CryptDegree',
        size: 2742,
        time_since_last_block_ms: 19538,
        object: 'block',
      },
    },
    {
      object: 'event',
      id: 55355,
      type: 'BLOCK_MINED',
      occurred_at: '2022-01-07T19:58:03.111Z',
      points: 100,
      user_id: 16450,
      metadata: {
        id: 882409,
        hash: '00000000008ab8f851bca6b89a1c5e8ea7a53a528eb3523f3ecb0462419de0d0',
        sequence: 57569,
        previous_block_hash:
          '0000000000beb4a487f1fd724a2bffe49364c902afb1de322795417d2accaa77',
        main: true,
        difficulty: 554082704524,
        transactions_count: 1,
        timestamp: '2022-01-07T19:58:03.111Z',
        graffiti: 'CryptDegree',
        size: 2744,
        time_since_last_block_ms: 23162,
        object: 'block',
      },
    },
  ],
  metadata: { has_next: false, has_previous: false },
}

// The number of events to display in the Recent Activity list.
const EVENTS_LIMIT = 25

const validTabValue = (x: string) =>
  x === 'weekly' || x === 'all' || x === 'settings'

interface Props {
  loginContext: LoginContext
}
export default function User({ loginContext }: Props) {
  const $toast = useQueriedToast({
    queryString: 'toast',
    duration: 8e3,
  })

  const router = useRouter()
  const { isReady: routerIsReady } = router
  const userId = (router?.query?.id || '') as string
  const rawTab = useQuery('tab')
  const [$activeTab, $setActiveTab] = useState<TabType>('weekly')

  const [$user, $setUser] = useState<API.ApiUser | undefined>(undefined)

  const [$events, _setEvents] = useState<API.ListEventsResponse | undefined>(
    FIXTURE
  )
  const $setEvents = (x: any) => x
  const [$allTimeMetrics, $setAllTimeMetrics] = useState<
    API.UserMetricsResponse | undefined
  >(undefined)
  const [$weeklyMetrics, $setWeeklyMetrics] = useState<
    API.UserMetricsResponse | undefined
  >(undefined)
  const [$metricsConfig, $setMetricsConfig] = useState<
    API.MetricsConfigResponse | undefined
  >(undefined)
  const [$fetched, $setFetched] = useState(false)
  useEffect(() => {
    if (rawTab && validTabValue(rawTab)) {
      $setActiveTab(rawTab as TabType)
    }
  }, [rawTab])

  useEffect(() => {
    let isCanceled = false

    const fetchData = async () => {
      try {
        if (!routerIsReady || $fetched) {
          return
        }
        const [user, events, allTimeMetrics, weeklyMetrics, metricsConfig] =
          await Promise.all([
            API.getUser(userId),
            API.listEvents({
              userId,
              limit: EVENTS_LIMIT,
            }),
            API.getUserAllTimeMetrics(userId),
            API.getUserWeeklyMetrics(userId),
            API.getMetricsConfig(),
          ])

        if (isCanceled) {
          return
        }

        if (
          'error' in user ||
          'error' in events ||
          'error' in allTimeMetrics ||
          'error' in weeklyMetrics ||
          'error' in metricsConfig
        ) {
          Router.push(
            `/leaderboard?toast=${btoa(
              'An error occurred while fetching user data'
            )}`
          )
          return
        }
        $setUser(user)
        $setEvents(events)
        $setAllTimeMetrics(allTimeMetrics)
        $setWeeklyMetrics(weeklyMetrics)
        $setMetricsConfig(metricsConfig)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e)

        throw e
      }
    }

    fetchData()
    return () => {
      isCanceled = true
    }
  }, [
    routerIsReady,
    userId,
    loginContext?.metadata?.id,
    loginContext?.metadata?.graffiti,
    $fetched,
  ])

  useEffect(() => {
    if (!$user) {
      return
    }
    $setFetched(true)
  }, [$user])

  // Recent Activity hooks
  const { $hasPrevious, $hasNext, fetchPrevious, fetchNext } =
    usePaginatedEvents(userId, EVENTS_LIMIT, $events, $setEvents)

  // Tab hooks
  const onTabChange = useCallback((t: TabType) => {
    $setActiveTab(t)
  }, [])

  if (
    !$user ||
    !$allTimeMetrics ||
    !$metricsConfig ||
    !$weeklyMetrics ||
    !$events
  ) {
    return <Loader />
  }

  const avatarColor = graffitiToColor($user.graffiti)
  const ordinalRank = numberToOrdinal($user.rank)
  const startDate = new Date(2021, 11, 1)

  const totalWeeklyLimit = Object.values($metricsConfig.weekly_limits).reduce(
    (acc, cur) => acc + cur,
    0
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{$user.graffiti}</title>
        <meta name="description" content={String($user.graffiti)} />
      </Head>

      <Navbar
        loginContext={loginContext}
        fill="black"
        className="bg-ifpink text-black"
      />

      <main className="bg-ifpink flex-1 justify-center flex pt-16 pb-32">
        <div style={{ flexBasis: 1138 }}>
          <OffsetBorderContainer>
            <div className="px-24 pt-16 pb-12">
              {/* Header */}
              <div
                className="flex justify-between mb-8"
                style={{ width: '100%' }}
              >
                <div>
                  <h1 className="font-extended text-6xl mt-6 mb-8">
                    {$user.graffiti}
                  </h1>

                  <div className="font-favorit flex flex-wrap gap-x-16 gap-y-2">
                    <div>
                      <div>All Time Rank</div>
                      <div className="text-3xl mt-2">{ordinalRank}</div>
                    </div>
                    <div>
                      <div>Total Points</div>
                      <div className="text-3xl mt-2">
                        {$user.total_points.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div>Weekly Points</div>
                      <div className="text-3xl mt-2">
                        {$weeklyMetrics.points.toLocaleString()} /{' '}
                        {totalWeeklyLimit.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <FishAvatar color={avatarColor} />
                  <div className="mt-4">
                    <Flag code={$user.country_code} />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs
                setRawMetadata={loginContext.setRawMetadata}
                setUserStatus={loginContext.setStatus}
                reloadUser={loginContext.reloadUser}
                toast={$toast}
                activeTab={$activeTab}
                onTabChange={onTabChange}
                user={$user}
                authedUser={loginContext.metadata}
                allTimeMetrics={$allTimeMetrics}
                weeklyMetrics={$weeklyMetrics}
                metricsConfig={$metricsConfig}
                setFetched={$setFetched}
                setUser={$setUser}
              />

              {/* Recent Activity */}
              {$activeTab !== 'settings' && (
                <>
                  <h1 className="font-favorit" id="recent-activity">
                    Recent Activity
                  </h1>

                  <table className="font-favorit w-full">
                    <thead>
                      <tr className="text-xs text-left tracking-widest border-b border-black">
                        <th className="font-normal py-4">ACTIVITY</th>
                        <th className="font-normal">DATE</th>
                        <th className="font-normal">POINTS</th>
                        <th className="font-normal max-w-[13rem]">DETAILS</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {renderEvents(startDate, $events.data)}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </OffsetBorderContainer>
          {/* Recent Activity Pagination */}
          {$activeTab !== 'settings' && (
            <div className="flex font-favorit justify-center mt-8">
              <div className="flex gap-x-1.5">
                <EventsPaginationButton
                  disabled={!$hasPrevious}
                  onClick={fetchPrevious}
                >{`<< Previous`}</EventsPaginationButton>
                <div>{`|`}</div>
                <EventsPaginationButton
                  disabled={!$hasNext}
                  onClick={fetchNext}
                >{`Next >>`}</EventsPaginationButton>
              </div>
            </div>
          )}
        </div>
      </main>
      <Toast
        message={$toast.message}
        visible={$toast.visible}
        alignment={Alignment.Top}
      />
      <Footer />
    </div>
  )
}
